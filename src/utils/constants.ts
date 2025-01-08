import { IQuiz, IMessage } from "@/utils/types";

export const BASIC_QUIZ_PROMPT = (
  topic: string,
  numberOfQuestions?: number,
  description?: string
) => `Assume your in a question paper setting committee of UPSC board and create a small quiz of ${numberOfQuestions || 5} questions 
to check my understanding of the topic - '${topic}'. ${description || ""}

Example of Output format: array of [{question:stringfy HTML or markdown language format, options: [], 
correctOption: string, explanation: stringfy HTML or markdown language format}]. 

Example questions with format: [{
  "question": "<p>Which of the following are fundamental duties of citizens under the Indian Constitution?</p>
  <ol><li>To abide by the Constitution and respect its ideals and institutions</li>
  <li>To protect and improve the natural environment including forests, lakes, rivers and wildlife</li></ol>",
  "options": [
    "(a) 1 only",
    "(b) 2 only",
    "(c) Both 1 and 2",
    "(d) Neither 1 nor 2"
  ],
  "correctOption": "(c) Both 1 and 2",
  "explanation": "Fundamental duties of citizens are outlined in Article 51A of the Indian Constitution. 
  Both the options listed are part of the fundamental duties.<br><br>\
    This question tests the candidate's knowledge about the fundamental duties of citizens as prescribed by the Indian Constitution. 
    Fundamental duties were added to the Constitution by the 42nd Amendment Act, 1976, on the recommendation of the Swaran Singh Committee.
    <br><br>\
    <b>Breakdown of Question Statements:</b><br>\
    <i>To abide by the Constitution and respect its ideals and institutions:</i> 
    This statement reflects one of the fundamental duties outlined in Article 51A of the Indian Constitution. 
    It emphasizes the obligation of citizens to uphold and honor the Constitution and its principles, respecting the ideals that it embodies.
    <br><br>\
    <i>To protect and improve the natural environment including forests, lakes, rivers and wildlife:</i> 
    This statement also corresponds to a fundamental duty listed under Article 51A(g) of the Indian Constitution. 
    It highlights the responsibility of citizens towards environmental conservation and sustainable development by 
    protecting natural resources and wildlife."
},
{
  "question": "Consider the following pairs:<br>Community sometimes mentioned in the news: In the affairs 
  of which country/community are they?<br>1. Kurds: Pakistan<br>2. Madhesis: Nepal<br>3. Rohingyas: Myanmar<br><br>
  Which of the pairs given above is/are correctly matched?",
  "options": [
    "1 and 2 only",
    "2 and 3 only",
    "1 and 3 only",
    "1, 2, and 3"
  ],
  "correctOption": "1 and 3 only",
  "explanation": "Option (c) is correct. <br><br>\
    <b>Kurds:</b> Kurds are primarily associated with Turkey and Iraq, not Pakistan. The Kurdish 
    people have been in the news due to their struggles for autonomy and political rights in Turkey and Iraq.<br><br>\
    <b>Madhesis:</b> Madhesis are an ethnic group in Nepal, residing primarily in the southern 
    Terai plains. They have been involved in political movements and protests related to ethnic rights 
    and representation within Nepal.<br><br>\
    <b>Rohingyas:</b> Rohingyas are a Muslim minority group predominantly from Rakhine State, Myanmar. They have 
    faced persecution and displacement, resulting in significant international attention and humanitarian concerns.<br><br>\
    Therefore, while Madhesis are correctly associated with Nepal and Rohingyas with Myanmar, Kurds are not primarily 
    associated with Pakistan."
}, {
"question": "<p>Which of the following have coral reefs?</p>",
      "options": [
        "Nicobar Islands",
        "Andaman Islands",
        "Lakshadweep",
        "Maldives"
      ],
      "correctOption": "Lakshadweep",
      "explanation": "<p>This question pertains to identifying regions known for their coral reefs. The 
      Nicobar Islands, Andaman Islands, Lakshadweep, and Maldives all feature significant coral reef ecosystems. However, the 
      Lakshadweep islands stand out for their extensive and biodiverse coral reefs. These reefs not only support a wide array of 
      marine life but also play crucial roles in coastal protection, tourism, and local livelihoods through fishing and 
      tourism activities. <br><br>The Nicobar and Andaman Islands are also renowned for their coral reefs, essential for marine 
      biodiversity and tourism. The Maldives, composed of coral atolls and reefs, are vital for its economy and cultural identity. 
      <br><br>Therefore, option (c) Lakshadweep is the correct answer.</p>"
}]
Things to not forget: "Difficulty of the quiz should be just like that of UPSC CSE exam and options should be in 
the same pattern of UPSC exam. Take inspiration from example questions given as well if needed. Give detailed and 
elaborated explanation for each question."`;

export const PYQS_PROMPT = (
  topic: string,
  numberOfQuestions: number = 10,
  description: string = ""
) => `Provide a JSON API response format for a collection of ${numberOfQuestions} previous year questions (PYQs) related to the ${topic} ${description}, specifically from the UPSC Civil Services Examination. Include each question statement formatted in HTML markup, a list of options formatted as (a) 1 only, (b) 2 only, (c) Both 1 and 2, (d) Neither 1 nor 2, the correct option in full text, and an explanation of the correct answer.
Example of Output format: array of [{question:stringfy HTML or markdown language format, options: [], correctOption: string, explanation: stringfy HTML or markdown language format}]. 
Example questions with format: [{
  "question": "<p>Which of the following are fundamental duties of citizens under the Indian Constitution?</p><ol><li>To abide by the Constitution and respect its ideals and institutions</li><li>To protect and improve the natural environment including forests, lakes, rivers and wildlife</li></ol> (Year - 2019)",
  "options": [
    "(a) 1 only",
    "(b) 2 only",
    "(c) Both 1 and 2",
    "(d) Neither 1 nor 2"
  ],
  "correctOption": "(c) Both 1 and 2",
  "explanation": "Fundamental duties of citizens are outlined in Article 51A of the Indian Constitution. Both the options listed are part of the fundamental duties.<br><br>\
    This question tests the candidate's knowledge about the fundamental duties of citizens as prescribed by the Indian Constitution. Fundamental duties were added to the Constitution by the 42nd Amendment Act, 1976, on the recommendation of the Swaran Singh Committee.<br><br>\
    <b>Breakdown of Question Statements:</b><br>\
    <i>To abide by the Constitution and respect its ideals and institutions:</i> This statement reflects one of the fundamental duties outlined in Article 51A of the Indian Constitution. It emphasizes the obligation of citizens to uphold and honor the Constitution and its principles, respecting the ideals that it embodies.<br><br>\
    <i>To protect and improve the natural environment including forests, lakes, rivers and wildlife:</i> This statement also corresponds to a fundamental duty listed under Article 51A(g) of the Indian Constitution. It highlights the responsibility of citizens towards environmental conservation and sustainable development by protecting natural resources and wildlife."
},
{
  "question": "Consider the following pairs:<br>Community sometimes mentioned in the news: In the affairs of which country/community are they?<br>1. Kurds: Pakistan<br>2. Madhesis: Nepal<br>3. Rohingyas: Myanmar<br><br>Which of the pairs given above is/are correctly matched? (Year - 2022)",
  "options": [
    "1 and 2 only",
    "2 and 3 only",
    "1 and 3 only",
    "1, 2, and 3"
  ],
  "correctOption": "1 and 3 only",
  "explanation": "Option (c) is correct. <br><br>\
    <b>Kurds:</b> Kurds are primarily associated with Turkey and Iraq, not Pakistan. The Kurdish people have been in the news due to their struggles for autonomy and political rights in Turkey and Iraq.<br><br>\
    <b>Madhesis:</b> Madhesis are an ethnic group in Nepal, residing primarily in the southern Terai plains. They have been involved in political movements and protests related to ethnic rights and representation within Nepal.<br><br>\
    <b>Rohingyas:</b> Rohingyas are a Muslim minority group predominantly from Rakhine State, Myanmar. They have faced persecution and displacement, resulting in significant international attention and humanitarian concerns.<br><br>\
    Therefore, while Madhesis are correctly associated with Nepal and Rohingyas with Myanmar, Kurds are not primarily associated with Pakistan."
}
]
Things to not forget: "Give detailed and elaborated explanation for each question. Also give the year in which the question was asked in exam in question value itself in brackets. If none of the questions were asked about the topic return empty array"`;


export const TEST_QUIZ_DATA: IQuiz[] = [
  {
    question:
      "Consider the following statements:<br>1. The Environment Protection Act, 1986 empowers the Government of India to state the requirement of public participation in the process of environmental impact assessment.<br>2. The National Green Tribunal Act, 2010 provides for the establishment of a National Green Tribunal for effective and expeditious disposal of cases related to environmental protection.<br><br>Which of the statements given above is/are correct?",
    options: ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
    correctOption: "Both 1 and 2",
    explanation:
      "Option (c) is correct. Both statements 1 and 2 are correct. The Environment Protection Act, 1986 indeed empowers the Government of India to involve the public in environmental impact assessments. The National Green Tribunal Act, 2010 established the National Green Tribunal for handling cases related to environmental protection.",
  },
  {
    question:
      "Which article of the Indian Constitution guarantees the Right to Equality?",
    options: ["Article 12", "Article 14", "Article 16", "Article 18"],
    correctOption: "Article 14",
    explanation:
      "Article 14 of the Indian Constitution guarantees the Right to Equality before the law and equal protection of the laws within the territory of India.",
  },
  {
    question:
      "Which fundamental right prohibits human trafficking and forced labor?",
    options: [
      "Right to Equality",
      "Right to Freedom",
      "Right against Exploitation",
      "Right to Constitutional Remedies",
    ],
    correctOption: "Right against Exploitation",
    explanation:
      "The Right against Exploitation, enshrined in Articles 23 and 24, prohibits human trafficking, forced labor, and employment of children in hazardous jobs.",
  },
  {
    question:
      "Under which article can a person move the Supreme Court for the enforcement of Fundamental Rights?",
    options: ["Article 32", "Article 226", "Article 19", "Article 21"],
    correctOption: "Article 32",
    explanation:
      "Article 32 of the Indian Constitution allows individuals to approach the Supreme Court directly for the enforcement of Fundamental Rights, making it a crucial aspect of the protection of these rights.",
  },
  {
    question:
      "Which of the following rights is NOT included under the Right to Freedom?",
    options: [
      "Freedom of Speech and Expression",
      "Freedom to Assemble Peaceably",
      "Freedom to Form Associations",
      "Right to Property",
    ],
    correctOption: "Right to Property",
    explanation:
      "The Right to Property was originally a fundamental right under Article 31 but was removed from the list of Fundamental Rights by the 44th Amendment in 1978 and is now a legal right under Article 300A.",
  },
  {
    question:
      "Which fundamental right ensures the protection of the interests of minorities?",
    options: [
      "Right to Equality",
      "Right to Freedom",
      "Cultural and Educational Rights",
      "Right to Constitutional Remedies",
    ],
    correctOption: "Cultural and Educational Rights",
    explanation:
      "Cultural and Educational Rights, under Articles 29 and 30, ensure the protection of the cultural, linguistic, and educational rights of minorities.",
  },
  {
    question:
      "Which article guarantees the right to life and personal liberty?",
    options: ["Article 19", "Article 21", "Article 22", "Article 23"],
    correctOption: "Article 21",
    explanation:
      "Article 21 guarantees the right to life and personal liberty, stating that no person shall be deprived of his life or personal liberty except according to the procedure established by law.",
  },
  {
    question: "What does Article 25 of the Indian Constitution deal with?",
    options: [
      "Freedom of Speech",
      "Right to Equality",
      "Freedom of Religion",
      "Right to Education",
    ],
    correctOption: "Freedom of Religion",
    explanation:
      "Article 25 guarantees freedom of conscience and the right to freely profess, practice, and propagate religion, subject to public order, morality, and health.",
  },
  {
    question:
      "Which amendment introduced the Right to Education as a fundamental right?",
    options: [
      "42nd Amendment",
      "44th Amendment",
      "86th Amendment",
      "92nd Amendment",
    ],
    correctOption: "86th Amendment",
    explanation:
      "The 86th Amendment Act of 2002 inserted Article 21A in the Indian Constitution, making the Right to Education a fundamental right for children aged 6 to 14 years.",
  },
  {
    question:
      "Which fundamental right was described by Dr. B.R. Ambedkar as the 'heart and soul of the Constitution'?",
    options: [
      "Right to Equality",
      "Right to Freedom",
      "Right to Constitutional Remedies",
      "Right to Education",
    ],
    correctOption: "Right to Constitutional Remedies",
    explanation:
      "Dr. B.R. Ambedkar referred to the Right to Constitutional Remedies under Article 32 as the 'heart and soul of the Constitution' because it allows individuals to seek redressal from the Supreme Court if their fundamental rights are violated.",
  },
  {
    question:
      "Which fundamental right aims to abolish untouchability in India?",
    options: [
      "Right to Equality",
      "Right to Freedom",
      "Right against Exploitation",
      "Right to Constitutional Remedies",
    ],
    correctOption: "Right to Equality",
    explanation:
      "Article 17, under the Right to Equality, abolishes 'untouchability' and forbids its practice in any form, ensuring equal treatment for all citizens.",
  },
];

export const TEST_CHAT_DATA: IMessage[] = [
  { role: "assistant", content: "Hello! How can I assist you today?" },
  { role: "assistant", content: "Hello! How can I help you today?" },
  {
    role: "assistant",
    content:
      "I'm just a computer program, so I don't have emoti…thank you for asking! How can I assist you today?",
  },
  { role: "assistant", content: "Hello! How can I assist you today?" },
  { role: "user", content: "Hey" },
  { role: "assistant", content: "Hello! How can I assist you today?" },
  {
    role: "user",
    content:
      "Output should have question , your in a question paper setting committee of UPSC board and create a small quiz of 10 questions to check my understanding of the topic Output should have question ,Output should have question ,",
  },
  {
    role: "assistant",
    content:
      "Assume your in a question paper setting committee of UPSC board and create a small quiz of 10 questions to check my understanding of the topic Assume your in a question paper setting committee of UPSC board and create a small quiz of 10 questions to check my understanding of the topic",
  },
  {
    role: "user",
    content:
      "Assume your in a question paper setting committee of UPSC board and create a small quiz of 10 questions to check my understanding of the topic",
  },
];
