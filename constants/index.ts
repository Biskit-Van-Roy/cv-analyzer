export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Desarrollador Frontend",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Ingeniero de Nube",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "Desarrollador iOS",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "4",
    companyName: "Google",
    jobTitle: "Desarrollador Frontend",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "5",
    companyName: "Microsoft",
    jobTitle: "Ingeniero de Nube",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "6",
    companyName: "Apple",
    jobTitle: "Desarrollador iOS",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
];

export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //máximo 100
      ATS: {
        score: number; //califica basado en compatibilidad con ATS
        tips: {
          type: "bueno" | "mejorar";
          tip: string; //dar 3-4 consejos
        }[];
      };
      toneAndStyle: {
        score: number; //máximo 100
        tips: {
          type: "bueno" | "mejorar";
          tip: string; //hacer un "título" corto para la explicación
          explanation: string; //explicar en detalle aquí
        }[]; //dar 3-4 consejos
      };
      content: {
        score: number; //máximo 100
        tips: {
          type: "bueno" | "mejorar";
          tip: string; //hacer un "título" corto para la explicación
          explanation: string; //explicar en detalle aquí
        }[]; //dar 3-4 consejos
      };
      structure: {
        score: number; //máximo 100
        tips: {
          type: "bueno" | "mejorar";
          tip: string; //hacer un "título" corto para la explicación
          explanation: string; //explicar en detalle aquí
        }[]; //dar 3-4 consejos
      };
      skills: {
        score: number; //máximo 100
        tips: {
          type: "bueno" | "mejorar";
          tip: string; //hacer un "título" corto para la explicación
          explanation: string; //explicar en detalle aquí
        }[]; //dar 3-4 consejos
      };
    }`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
}: {
  jobTitle: string;
  jobDescription: string;
}) =>
  `Eres un experto en ATS (Sistema de Seguimiento de Candidatos) y análisis de currículums. Por favor, analiza y califica este currículum y sugiere cómo mejorarlo. La calificación puede ser baja si el currículum es deficiente. Sé exhaustivo y detallado. No temas señalar errores o áreas de mejora. Si hay mucho que mejorar, no dudes en dar puntuaciones bajas. Esto es para ayudar al usuario a mejorar su currículum. Si está disponible, utiliza la descripción del puesto de trabajo al que el usuario está solicitando para dar retroalimentación más detallada. Si se proporciona, ten en cuenta la descripción del puesto. El título del trabajo es: ${jobTitle}. La descripción del trabajo es: ${jobDescription}. 

IMPORTANTE: Proporciona toda la retroalimentación completamente en español. Todos los consejos, explicaciones y textos deben estar en español.

Proporciona la retroalimentación usando el siguiente formato: ${AIResponseFormat}. 

Devuelve el análisis como un objeto JSON válido, sin ningún otro texto y sin las comillas invertidas de markdown. No incluyas ningún otro texto o comentarios. Asegúrate de que todos los valores de "tip" y "explanation" estén completamente en español.`;
