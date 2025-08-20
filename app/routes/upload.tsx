import Navbar from "~/components/Navbar";
import {type FormEvent, useState} from "react";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";


const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);

        setStatusText('Cargando el archivo...');
        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setStatusText('Error: No se pudo cargar el archivo');

        setStatusText('Convirtiendo la imagen...');
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) return setStatusText('Error: No se pudo convertir de PDF a imagen');

        setStatusText('Cargando la imagen...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: No se pudo cargar la imagen');

        setStatusText('Preparando informacion...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analizando...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setStatusText('Error: No se pudo analizar el CV');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analisis completado, redireccionando...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="bg-[url('/images/fondo2.jpg')] bg-cover">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-2">
                    <h1>Smart Feedback de tu CV segun el puesto</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-1/2" />
                        </>
                    ) : (
                        <></>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name">Nombre de la empresa</label>
                                <input type="text" name="company-name" placeholder="Nombre de la empresa" id="company-name" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Titulo del puesto</label>
                                <input type="text" name="job-title" placeholder="Titulo del puesto" id="job-title" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Descripcion del puesto</label>
                                <textarea rows={5} name="job-description" placeholder="Descripcion del puesto" id="job-description" />
                            </div>

                            <div className="form-div">
                                <label htmlFor="uploader">Cargar CV</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button className="primary-button" type="submit">
                                ANALIZAR
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload;