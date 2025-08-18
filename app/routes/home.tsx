import type {Route} from "./+types/home";
import Navbar from "~/components/Navbar";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "CV-AI"},
        {name: "description", content: "Aplicacion inteligente para buscar oportunidades laborales basado en tu CV"},
    ];
}

export default function Home() {
    const {auth} = usePuterStore();
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated]);
    return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar/>
        <section className="main-section">
            <div className="page-heading py-16">
                <h1>
                    Ten un seguimiento para buscar oportunidades
                </h1>
                <h2>Revisa tus solicitudes y recibe FeedBack AI</h2>
            </div>
            {resumes.length > 0 &&(
                <div className="resumes-section">
                    {
                        resumes.map((resume) => (
                            <ResumeCard key={resume.id} resume={resume}/>
                        ))
                    }
                </div>

            )}
        </section>


    </main>;
}
