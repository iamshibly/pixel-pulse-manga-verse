import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { Timer, Brain, Trophy, Star, Zap } from "lucide-react";

interface Question {
  id: number;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Quiz {
  id: string;
  questions: Question[];
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // in seconds
  type: 'quick' | 'challenge' | 'expert';
}

interface UserData {
  username: string;
  xp: number;
  quizzesCompleted: number;
}

interface LeaderboardEntry extends UserData {
  rank: number;
  badge?: '🥇' | '🥈' | '🥉';
}

const QuizSystem: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    // Load user data and leaderboard from localStorage
    const savedUser = localStorage.getItem('animeQuizUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserData(user);
      setUsername(user.username);
    }
    loadLeaderboard();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isQuizActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isQuizActive) {
      finishQuiz();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isQuizActive]);

  const loadLeaderboard = () => {
    const saved = localStorage.getItem('animeQuizLeaderboard');
    if (saved) {
      const data = JSON.parse(saved);
      const sorted = data
        .sort((a: UserData, b: UserData) => b.xp - a.xp)
        .slice(0, 10)
        .map((user: UserData, index: number) => ({
          ...user,
          rank: index + 1,
          badge: index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : undefined
        }));
      setLeaderboard(sorted);
    }
  };

  const saveUserData = (user: UserData) => {
    localStorage.setItem('animeQuizUser', JSON.stringify(user));
    
    // Update leaderboard
    const saved = localStorage.getItem('animeQuizLeaderboard');
    let leaderboardData = saved ? JSON.parse(saved) : [];
    
    const existingIndex = leaderboardData.findIndex((u: UserData) => u.username === user.username);
    if (existingIndex >= 0) {
      leaderboardData[existingIndex] = user;
    } else {
      leaderboardData.push(user);
    }
    
    localStorage.setItem('animeQuizLeaderboard', JSON.stringify(leaderboardData));
    loadLeaderboard();
  };

  const generateQuiz = async (type: 'quick' | 'challenge' | 'expert') => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to generate quizzes.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const duration = type === 'quick' ? 60 : type === 'challenge' ? 180 : 300;
      const difficulty = type === 'quick' ? 'easy' : type === 'challenge' ? 'medium' : 'hard';
      
      const prompt = `Generate a unique 5-question anime/manga quiz with the following specifications:
      - Difficulty: ${difficulty}
      - Mix of question types: 2 multiple-choice (4 options each), 2 true/false, 1 fill-in-the-blank
      - Cover diverse anime/manga topics: characters, plot, release years, creators, trivia
      - Each question should be completely unique and not repetitive
      - Format as JSON with this structure:
      {
        "questions": [
          {
            "type": "multiple-choice",
            "question": "question text",
            "options": ["A", "B", "C", "D"],
            "correctAnswer": "A",
            "difficulty": "${difficulty}"
          },
          {
            "type": "true-false",
            "question": "statement to evaluate",
            "correctAnswer": "true",
            "difficulty": "${difficulty}"
          },
          {
            "type": "fill-blank",
            "question": "question with _____ blank",
            "correctAnswer": "answer",
            "difficulty": "${difficulty}"
          }
        ]
      }`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are an anime/manga expert creating diverse quiz questions. Always respond with valid JSON only.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.9,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate quiz');
      }

      const data = await response.json();
      const quizData = JSON.parse(data.choices[0].message.content);
      
      const quiz: Quiz = {
        id: Date.now().toString(),
        questions: quizData.questions.map((q: any, index: number) => ({
          id: index + 1,
          ...q
        })),
        difficulty,
        duration,
        type
      };

      setCurrentQuiz(quiz);
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setTimeLeft(duration);
      setIsQuizActive(true);
      setShowResults(false);
      setScore(0);
      
      toast({
        title: "Quiz Generated!",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} quiz ready. You have ${duration / 60} minutes!`
      });
    } catch (error) {
      console.error('Error generating quiz:', error);
      toast({
        title: "Error",
        description: "Failed to generate quiz. Please check your API key.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < currentQuiz!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const finishQuiz = (answers = userAnswers) => {
    if (!currentQuiz) return;

    setIsQuizActive(false);
    
    let correctCount = 0;
    currentQuiz.questions.forEach((question, index) => {
      if (answers[index]?.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) {
        correctCount++;
      }
    });

    const earnedXP = correctCount * 10;
    setScore(correctCount);

    if (userData) {
      const updatedUser = {
        ...userData,
        xp: userData.xp + earnedXP,
        quizzesCompleted: userData.quizzesCompleted + 1
      };
      setUserData(updatedUser);
      saveUserData(updatedUser);
    }

    setShowResults(true);
    toast({
      title: "Quiz Complete!",
      description: `You scored ${correctCount}/5 and earned ${earnedXP} XP!`
    });
  };

  const startNewSession = () => {
    if (!username) {
      toast({
        title: "Username Required",
        description: "Please enter a username to start playing.",
        variant: "destructive"
      });
      return;
    }

    const newUser: UserData = {
      username,
      xp: 0,
      quizzesCompleted: 0
    };
    setUserData(newUser);
    saveUserData(newUser);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!userData) {
    return (
      <div className="max-w-md mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6" />
              Anime Quiz Arena
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="apikey">OpenAI API Key</Label>
              <Input
                id="apikey"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Required for AI-generated quiz questions
              </p>
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <Button onClick={startNewSession} className="w-full">
              Start Playing
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showLeaderboard) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <div
                  key={entry.username}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold">#{entry.rank}</span>
                    {entry.badge && <span className="text-2xl">{entry.badge}</span>}
                    <span className="font-medium">{entry.username}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">{entry.xp} XP</div>
                    <div className="text-sm text-muted-foreground">
                      {entry.quizzesCompleted} quizzes
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              onClick={() => setShowLeaderboard(false)} 
              className="w-full mt-4"
            >
              Back to Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isQuizActive && currentQuiz) {
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Question {currentQuestionIndex + 1}/5</CardTitle>
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {currentQuestion.difficulty}
              </Badge>
              <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
            </div>

            {currentQuestion.type === 'multiple-choice' && (
              <div className="space-y-2">
                {currentQuestion.options?.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'true-false' && (
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleAnswer('true')}
                >
                  True
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleAnswer('false')}
                >
                  False
                </Button>
              </div>
            )}

            {currentQuestion.type === 'fill-blank' && (
              <div className="space-y-4">
                <Input
                  placeholder="Type your answer..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAnswer((e.target as HTMLInputElement).value);
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    const input = document.querySelector('input') as HTMLInputElement;
                    handleAnswer(input.value);
                  }}
                  className="w-full"
                >
                  Submit Answer
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults && currentQuiz) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-6 w-6" />
              Quiz Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{score}/5</div>
              <div className="text-xl">+{score * 10} XP</div>
              <div className="text-muted-foreground">
                Total XP: {userData.xp}
              </div>
            </div>

            <div className="space-y-3">
              {currentQuiz.questions.map((question, index) => (
                <div key={question.id} className="p-3 rounded-lg bg-secondary/50">
                  <div className="font-medium">{question.question}</div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Your answer: {userAnswers[index] || 'No answer'}</span>
                    <span className="text-green-500">Correct: {question.correctAnswer}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setShowResults(false)} className="flex-1">
                New Quiz
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowLeaderboard(true)}
                className="flex-1"
              >
                View Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            Welcome, {userData.username}!
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>{userData.xp} XP</span>
            </div>
            <div className="text-muted-foreground">
              {userData.quizzesCompleted} quizzes completed
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <Timer className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <h3 className="font-medium">Quick Quiz</h3>
            <p className="text-sm text-muted-foreground">1 minute • Easy</p>
            <Button 
              onClick={() => generateQuiz('quick')} 
              disabled={loading}
              className="w-full mt-3"
              size="sm"
            >
              Start
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <Brain className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <h3 className="font-medium">Challenge</h3>
            <p className="text-sm text-muted-foreground">3 minutes • Medium</p>
            <Button 
              onClick={() => generateQuiz('challenge')} 
              disabled={loading}
              className="w-full mt-3"
              size="sm"
            >
              Start
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-red-500" />
            <h3 className="font-medium">Expert</h3>
            <p className="text-sm text-muted-foreground">5 minutes • Hard</p>
            <Button 
              onClick={() => generateQuiz('expert')} 
              disabled={loading}
              className="w-full mt-3"
              size="sm"
            >
              Start
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <Button 
            variant="outline" 
            onClick={() => setShowLeaderboard(true)}
            className="w-full"
          >
            <Trophy className="h-4 w-4 mr-2" />
            View Leaderboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizSystem;