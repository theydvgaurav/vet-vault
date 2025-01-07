"use client";

import { useState, useEffect, useRef } from "react";
import { PetCard } from "./pet-card";

import { Pet } from '@/lib/types'

export function PetList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 12;
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await fetch(`/api/pet-list?page=${currentPage}&limit=${itemsPerPage}`);
        const data = await response.json();
        if (data.data.length > 0) {
          setPets((prevPets) => [...prevPets, ...data.data]);
          setHasMore(data.totalPages > currentPage);
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    }

    if (hasMore) {
      fetchPets();
    }
  }, [currentPage, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [loading, hasMore]);

  if (loading && currentPage === 1) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pets.map((pet) => (
          <PetCard key={pet.petId} pet={pet} />
        ))}
      </div>

      {loading && currentPage > 1 && (
        <div className="text-center mt-4">Loading more pets...</div>
      )}

      <div ref={bottomRef}></div>
    </div>
  );
}
