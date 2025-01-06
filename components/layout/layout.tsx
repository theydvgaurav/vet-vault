
import dynamic from "next/dynamic";

const Navbar = dynamic(()=>import("../layout/navbar"),{
    ssr:false
})

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <Navbar />
            {children}
        </div>
    );
}