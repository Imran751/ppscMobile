import { collection, addDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyDbDcEc6stPu2jumcUi50LspIoNoJwOHG0",
  authDomain: "ppsc-pre.firebaseapp.com",
  projectId: "ppsc-pre",
  storageBucket: "ppsc-pre.firebasestorage.app",
  messagingSenderId: "1017974693436",
  appId: "1:1017974693436:web:a34ed30a0d09045f76ad39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample quiz data
const quizData = [
  {
    "question": "Who is the current President of the United States?",
    "category": "Current Affairs",
    "options": ["Joe Biden", "Donald Trump", "Barack Obama", "George W. Bush"],
    "answer": "Joe Biden",
    "details": "Joe Biden was inaugurated as the 46th President of the United States on January 20, 2021."
  },
  {
    "question": "Which country recently hosted the 2022 Winter Olympics?",
    "category": "Current Affairs",
    "options": ["Russia", "China", "Japan", "South Korea"],
    "answer": "China",
    "details": "The 2022 Winter Olympics were held in Beijing, China from February 4 to February 20, 2022."
  },
  {
    "question": "What is the name of the Mars rover launched by NASA in 2020?",
    "category": "Current Affairs",
    "options": ["Curiosity", "Perseverance", "Opportunity", "Spirit"],
    "answer": "Perseverance",
    "details": "NASA's Perseverance rover was launched in July 2020 and landed on Mars in February 2021."
  },
  {
    "question": "Who became the first female vice president of the United States?",
    "category": "Current Affairs",
    "options": ["Hillary Clinton", "Kamala Harris", "Nancy Pelosi", "Condoleezza Rice"],
    "answer": "Kamala Harris",
    "details": "Kamala Harris was sworn in as the first female Vice President of the United States on January 20, 2021."
  },
  {
    "question": "Which country is leading the world in COVID-19 vaccinations?",
    "category": "Current Affairs",
    "options": ["United States", "India", "China", "Israel"],
    "answer": "China",
    "details": "China has administered the most COVID-19 vaccinations globally, with over 3 billion doses administered as of late 2021."
  },
  {
    "question": "Which country was the first to approve the COVID-19 vaccine for emergency use?",
    "category": "Current Affairs",
    "options": ["United Kingdom", "United States", "Russia", "China"],
    "answer": "United Kingdom",
    "details": "The United Kingdom became the first country to approve the Pfizer-BioNTech COVID-19 vaccine for emergency use in December 2020."
  },
  {
    "question": "Which global event was postponed due to the COVID-19 pandemic in 2020?",
    "category": "Current Affairs",
    "options": ["The World Cup", "The Summer Olympics", "The Super Bowl", "The Winter Olympics"],
    "answer": "The Summer Olympics",
    "details": "The 2020 Summer Olympics were postponed to 2021 due to the COVID-19 pandemic, held in Tokyo from July 23 to August 8, 2021."
  },
  {
    "question": "Which country recently became the first to legalize the use of recreational marijuana?",
    "category": "Current Affairs",
    "options": ["Canada", "Mexico", "Uruguay", "Colombia"],
    "answer": "Uruguay",
    "details": "Uruguay became the first country in the world to fully legalize recreational marijuana in 2013."
  },
  {
    "question": "Which social media platform did Donald Trump get permanently banned from in 2021?",
    "category": "Current Affairs",
    "options": ["Facebook", "Twitter", "Instagram", "YouTube"],
    "answer": "Twitter",
    "details": "Twitter permanently banned Donald Trump in January 2021 due to the risk of inciting further violence following the Capitol riot."
  },
  {
    "question": "Which African country recently passed a landmark law to ban plastic bags?",
    "category": "Current Affairs",
    "options": ["Kenya", "Nigeria", "South Africa", "Egypt"],
    "answer": "Kenya",
    "details": "Kenya passed one of the world's strictest laws in 2017, banning plastic bags to reduce pollution and protect the environment."
  }
];


// Function to upload quiz data to Firestore
const uploadQuizData = async () => {
  try {
    const quizCollectionRef = collection(db, "quizzes"); // Collection name in Firestore
    for (const quiz of quizData) {
      await addDoc(quizCollectionRef, quiz);
    }
    console.log("Quiz data uploaded successfully!");
  } catch (error) {
    console.error("Error uploading quiz data: ", error);
  }
};

uploadQuizData();
