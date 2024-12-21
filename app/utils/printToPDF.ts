import { Resume } from "../types/resume";

export default function printToPDF(resume: Resume) {
    const printWindow = window.open("", "", "width=600,height=600");
    printWindow?.document.write(`
        <html>
            <head>
                <title>${resume.name}</title>
                <style>
                    body {
                        font-family: Georgia, serif;
                        line-height: 1.5;
                        margin: 20px;
                    }
                    h1, h2, h3 {
                        margin: 0;
                        padding: 0;
                    }
                    h1 {
                        font-size: 24px;
                        margin-bottom: 10px;
                    }
                    h2 {
                        font-size: 20px;
                        margin-top: 20px;
                        margin-bottom: 10px;
                    }
                    h3 {
                        font-size: 16px;
                        margin-top: 10px;
                        margin-bottom: 5px;
                    }
                    p {
                        margin: 5px 0;
                    }
                    .section {
                        margin-bottom: 20px;
                    }
                    .skills {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                    }
                    .skill {
                        padding: 5px 10px;
                        background-color: #f1f1f1;
                        border-radius: 5px;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <h1>${resume.name}</h1>
                <p>${resume.bio}</p>
                
                <div class="section">
                    <h2>Experience</h2>
                    ${resume.experience.map(exp => `
                        <div>
                            <h3>${exp.position}</h3>
                            <p>${exp.company}</p>
                            <p><small>${exp.startDate} - ${exp.endDate}</small></p>
                            <p>${exp.description}</p>
                        </div>
                    `).join('')}
                </div>

                <div class="section">
                    <h2>Education</h2>
                    ${resume.education.map(edu => `
                        <div>
                            <h3>${edu.title}</h3>
                            <p>${edu.institution}</p>
                            <p><small>${edu.startDate} - ${edu.endDate}</small></p>
                            <p>${edu.description}</p>
                        </div>
                    `).join('')}
                </div>

                <div class="section">
                    <h2>Skills</h2>
                    <div class="skills">
                        ${resume.skills.map(skill => `
                            <div class="skill">${skill}</div>
                        `).join('')}
                    </div>
                </div>
            </body>
        </html>
    `);
    printWindow?.document.close();
    printWindow?.print();
}
