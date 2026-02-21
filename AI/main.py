from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
import pandas as pd
from fpdf import FPDF
import os
import re

import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # فولدر main.py
csv_path = os.path.join(BASE_DIR, "final final data sets.csv")  # المسار الكامل للملف

df = pd.read_csv(csv_path)


app = FastAPI(title="CV Generator API")


from pydantic import BaseModel

class CVRequest(BaseModel):
    name: str
    email: str
    phone: str
    track: str
    courses: str
    training: str
    linkedin: str         
    education: str        
    projects: str         
    languages: str         


def detect_job_title(track):
    track = track.lower()
    if any(word in track for word in ["data analysis", "data analyst"]):
        return "Data Analyst"
    elif any(word in track for word in ["data science", "machine learning", "deep learning"]):
        return "Data Scientist"
    elif any(word in track for word in ["artificial intelligence", "ai"]):
        return "AI Engineer"
    elif any(word in track for word in ["nlp"]):
        return "NLP Engineer"
    elif any(word in track for word in ["data engineering", "big data", "data integration"]):
        return "Data Engineer"
    elif any(word in track for word in ["frontend", "ui", "ux"]):
        return "Frontend Developer"
    elif any(word in track for word in ["backend"]):
        return "Backend Developer"
    elif any(word in track for word in ["mobile"]):
        return "Mobile Developer"
    elif any(word in track for word in ["cloud", "devops"]):
        return "Cloud / DevOps Engineer"
    elif any(word in track for word in ["cybersecurity", "security"]):
        return "Cybersecurity Engineer"
    elif any(word in track for word in ["robotics", "embedded systems"]):
        return "Robotics Engineer"
    elif any(word in track for word in ["game", "gaming"]):
        return "Game Developer"
    elif any(word in track for word in ["bioinformatics"]):
        return "Bioinformatics Specialist"
    elif any(word in track for word in ["computer graphics"]):
        return "Graphics Engineer"
    elif any(word in track for word in ["databases"]):
        return "Database Engineer"
    elif any(word in track for word in ["quality assurance"]):
        return "QA Engineer"
    elif any(word in track for word in ["data governance"]):
        return "Data Governance Specialist"
    elif any(word in track for word in ["compiler"]):
        return "Compiler Engineer"
    elif any(word in track for word in ["operating systems"]):
        return "Systems Engineer"
    elif any(word in track for word in ["computer networks"]):
        return "Network Engineer"
    elif any(word in track for word in ["quantum"]):
        return "Quantum Computing Researcher"
    elif any(word in track for word in ["hci", "human-computer interaction"]):
        return "HCI Specialist"
    else:
        return "Software Engineer"


@app.post("/generate_cv/")
def generate_cv(request: CVRequest):
  
    filtered_df = df[df["track"].str.lower() == request.track.lower()]
    skills_series = filtered_df["skills"].str.split(",")
    all_skills = []
    for skills in skills_series:
        for skill in skills:
            all_skills.append(skill.strip())
    top_skills = pd.Series(all_skills).value_counts().head(15).index.tolist()

    job_title = detect_job_title(request.track)

    summary_text = (
        f"{job_title} with a strong technical background in {request.track}. "
        f"Experienced in core technologies such as {top_skills[0]}, {top_skills[1]}, and {top_skills[2]}. "
        "Completed professional training and courses focused on practical, real-world applications. "
        "Seeking an opportunity to contribute technical skills in a professional environment."
    )

    # Ø¥ÙØ´Ø§Ø¡ PDF
    pdf = FPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)

       # ===== Header =====
    pdf.set_font("Arial", "B", 18)
    pdf.cell(0, 10, request.name, ln=True, align="C")

    pdf.set_font("Arial", "I", 13)
    pdf.cell(0, 8, job_title, ln=True, align="C")

    pdf.ln(5)
    pdf.set_font("Arial", "", 11)
    pdf.cell(0, 8, f"{request.email} | {request.phone} | {request.linkedin}", ln=True, align="C")
    pdf.ln(8)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(5)

    # ===== Professional Summary =====
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 8, "Professional Summary", ln=True)
    pdf.set_font("Arial", "", 11)
    pdf.multi_cell(0, 7, summary_text)
    pdf.ln(3)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(5)
    
    
    # ===== Education =====
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 8, "Education", ln=True)
    pdf.set_font("Arial", "", 11)
    education_line = " - ".join([e.strip() for e in request.education.split(",")])
    pdf.multi_cell(0, 7, education_line)
    pdf.ln(3)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(5)
    

    # ===== Skills =====
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 8, "Technical Skills", ln=True)
    pdf.set_font("Arial", "", 11)
    skills_line = " - ".join(top_skills)
    pdf.multi_cell(0, 7, skills_line)
    pdf.ln(3)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(5)

    # ===== Courses =====
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 8, "Courses", ln=True)
    pdf.set_font("Arial", "", 11)
    courses_line = " - ".join([c.strip() for c in request.courses.split(",")])
    pdf.multi_cell(0, 7, courses_line)
    pdf.ln(3)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(5)

    # ===== Training =====
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 8, "Training", ln=True)
    pdf.set_font("Arial", "", 11)
    training_line = " - ".join([t.strip() for t in request.training.split(",")])
    pdf.multi_cell(0, 7, training_line)
    pdf.ln(3)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    
    
    
    # ===== Projects =====
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 8, "Projects", ln=True)
    pdf.set_font("Arial", "", 11)
    projects_line = " - ".join([p.strip() for p in request.projects.split(",")])
    pdf.multi_cell(0, 7, projects_line)
    pdf.ln(3)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(5)
    
    
    # ===== Languages =====
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 8, "Languages", ln=True)
    pdf.set_font("Arial", "", 11)
    languages_line = " - ".join([l.strip() for l in request.languages.split(",")])
    pdf.multi_cell(0, 7, languages_line)
    pdf.ln(3)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(5)

    # ===== Ø­ÙØ¸ PDF =====
    safe_name = re.sub(r"[^a-zA-Z0-9_]", "_", request.name)
    file_name = f"{safe_name}_CV.pdf"
    pdf.output(file_name)

    return FileResponse(file_name, media_type='application/pdf', filename=file_name)