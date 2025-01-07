
import dynamic from "next/dynamic";

const Navbar = dynamic(()=>import("../layout/navbar"),{
    ssr:false
})

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            {children}
        </div>
    );
}