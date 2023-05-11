import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Box, Typography } from '@mui/material';
import './App.css'

type Question = {
  question: string;
  answer: string;
};

type Quiz = {
  title: string;
  questions: Question[];
};

type QuizFormProps = {
  onSubmit: (quiz: Quiz) => void;
};

const QuizForm = ({ onSubmit }: QuizFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Quiz>();

  const onSubmitForm = (data: Quiz) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <TextField
        label="Quiz Title"
        variant="outlined"
        {...register('title', { required: true })}
        error={Boolean(errors.title)}
        helperText={errors.title ? 'Title is required' : ''}
        fullWidth
        sx={{ marginBottom: '1rem' }}
      />

      <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
        Questions:
      </Typography>

      {errors.questions && (
        <Typography variant="caption" color="red">
          At least one question is required.
        </Typography>
      )}

      {Array.from({ length: 3 }).map((_, index) => (
        <Box key={index} sx={{ marginBottom: '1rem' }}>
          <TextField
            label={`Question ${index + 1}`}
            variant="outlined"
            {...register(`questions.${index}.question`, { required: true })}
            error={Boolean(errors.questions?.[index]?.question)}
            helperText={errors.questions?.[index]?.question ? 'Question is required' : ''}
            fullWidth
            sx={{ marginBottom: '0.5rem' }}
          />

          <TextField
            label={`Answer ${index + 1}`}
            variant="outlined"
            {...register(`questions.${index}.answer`, { required: true })}
            error={Boolean(errors.questions?.[index]?.answer)}
            helperText={errors.questions?.[index]?.answer ? 'Answer is required' : ''}
            fullWidth
          />
        </Box>
      ))}

      <Button type="submit" variant="contained" color="primary">
        Create Quiz
      </Button>
    </form>
  );
};

const App = () => {
  const [createdQuiz, setCreatedQuiz] = useState<Quiz | null>(null);

  const handleQuizSubmit = (quiz: Quiz) => {
    setCreatedQuiz(quiz);
  };

  return (
    <div className="App">
      <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
        Quiz Builder
      </Typography>

      {!createdQuiz && <QuizForm onSubmit={handleQuizSubmit} />}

      {createdQuiz && (
        <div>
          <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
            Created Quiz
          </Typography>

          <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
            Title: {createdQuiz.title}
          </Typography>

          <Typography variant="h6">Questions:</Typography>

          {createdQuiz.questions.map((question, index) => (
            <div key={index}>
              <Typography variant="subtitle1">{question.question}</Typography>
              <Typography variant="body1">Answer: {question.answer}</Typography>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;