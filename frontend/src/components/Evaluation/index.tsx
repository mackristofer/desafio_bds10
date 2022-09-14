import Button from 'components/Button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { requestPostEvaluation } from 'utils/requests';
import './styles.css';

type Props = {
  movieId: string;
  onNewSubmit: Function;
};

type FormData = {
  movieId: number;
  text: string;
};

const Evaluation = ({ movieId, onNewSubmit }: Props) => {
  const { register, handleSubmit } = useForm<FormData>();

  const [hasError, setHasError] = useState(false);

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);

    requestPostEvaluation(formData)
      .then((response) => {
        setHasError(false);
        onNewSubmit();
      })
      .catch((error) => {
        setHasError(true);
      });
  };

  return (
    <div className="container base-card evaluation-card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('text')}
            type="text"
            className="form-control evaluation-input base-input"
            placeholder="Deixe a sua avaliação aqui"
            name="text"
          />
        </div>
        <div className="evaluation-submit">
          <Button text="Salvar Avaliação" />
        </div>
      </form>
    </div>
  );
};

export default Evaluation;
