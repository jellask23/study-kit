"use client";
import { useEffect, useState } from "react";
import { IQuiz } from "@/utils/types";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";

interface QuizProps {
  quizData: IQuiz[];
  topic: string;
}

const Quiz = ({ quizData, topic }: QuizProps) => {
  const [answers, setAnswers] = useState<string[]>(
    Array(quizData.length).fill("")
  );
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(
    Array(quizData.length).fill(false)
  );
  const [testSubmitted, setTestSubmitted] = useState(false);

  useEffect(() => {
    setAnswers(Array(quizData.length).fill(""));
    setShowExplanation(Array(quizData.length).fill(false));
    setTestSubmitted(false);
  }, [quizData]);

  const handleOptionChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    console.log(quizData);
    let newScore = 0;
    answers.forEach((answer: string, index: number) => {
      console.log(quizData[index].correctOption);
      if (answer.includes(quizData[index].correctOption)) {
        newScore++;
      }
    });
    setScore(newScore);
    setTestSubmitted(true);
  };

  const handleShowExplanation = (index: number) => {
    const newShowExplanation = [...showExplanation];
    if (newShowExplanation[index]) {
      newShowExplanation[index] = false;
    } else {
      newShowExplanation[index] = true;
    }
    setShowExplanation(newShowExplanation);
  };

  return (
    <div className="max-w-screen-lg w-full h-full overflow-visible rounded-lg mx-auto flex flex-col gap-4">
      <div className="text-xl text-center font-bold uppercase">{topic}</div>
      <form className="flex flex-col gap-4">
        {quizData.map((question, index) => (
          <>
            <Card
              key={topic + index}
              className="w-full overflow-visible"
              radius="lg"
              // isBlurred
            >
              <CardHeader className="p-4 overflow-auto">
                <div
                  dangerouslySetInnerHTML={{ __html: question.question }}
                ></div>
                {testSubmitted && (
                  <div className="absolute -top-4 right-0 z-15">
                    <Badge
                      showOutline={false}
                      color={
                        answers[index]
                          ? answers[index] === question.correctOption
                            ? "success"
                            : "danger"
                          : "default"
                      }
                      content={
                        answers[index]
                          ? answers[index] === question.correctOption
                            ? "✓"
                            : "✗"
                          : "•"
                      }
                      isInvisible={!testSubmitted}
                    >
                      <></>
                    </Badge>
                  </div>
                )}
              </CardHeader>
              <Divider />
              <CardBody className="p-4">
                <div className="flex flex-col">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={topic + index + optionIndex}
                      className={`
                        w-full text-center border rounded-lg p-2 my-2 cursor-pointer select-none
                    hover:bg-primary/10
                    ${
                      answers[index] === option && !testSubmitted
                        ? "bg-primary/10 border-primary text-primary"
                        : "border"
                    }
                    ${
                      testSubmitted
                        ? option === question.correctOption
                          ? "bg-success/10 border-success text-success"
                          : option === answers[index]
                          ? "bg-danger/10 border-danger text-danger"
                          : ""
                        : ""
                    }
                  `}
                      onClick={() =>
                        !testSubmitted && handleOptionChange(index, option)
                      }
                    >
                      {option}
                      {/* <div className="absolute top-2 right-2">
                      <Chip
                        color={
                          answers[index]
                            ? answers[index] === question.correctOption
                              ? "success"
                              : "danger"
                            : "default"
                        }
                        variant="dot"
                      >
                        {answers[index]
                          ? answers[index] === question.correctOption
                            ? "Correct"
                            : "Incorrect"
                          : "Not Answered"}
                      </Chip>
                    </div> */}
                    </div>
                  ))}
                </div>
              </CardBody>
              {testSubmitted && (
                <>
                  <Divider />
                  <CardFooter className="flex flex-col gap-1 items-center">
                    <>
                      <Button
                        color="warning"
                        variant="ghost"
                        onPress={() => handleShowExplanation(index)}
                      >
                        {showExplanation[index] ? "Hide" : "Show"} Explanation
                      </Button>
                      {showExplanation[index] && (
                        <p
                          className="mt-4"
                          dangerouslySetInnerHTML={{
                            __html: question.explanation,
                          }}
                        ></p>
                      )}
                    </>
                  </CardFooter>
                </>
              )}
            </Card>
          </>
        ))}
      </form>

      {!testSubmitted ? (
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      ) : (
        <>
          <Alert
            hideIconWrapper
            color="success"
            description={`Your Score: ${score} / ${quizData.length}`}
            title="Exam completed"
            // variant="bordered"
            endContent={
              <Button color="success" variant="light" onClick={() => {
                // setQuizData(null);
                setAnswers(Array(quizData.length).fill(""));
                setScore(0);
                setTestSubmitted(false);
              }}>
                Retake Quiz
              </Button>
            }
          />
        </>
      )}
    </div>
  );
};

export default Quiz;
