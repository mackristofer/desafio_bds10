
import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Genre } from 'types/genre';
import { requestBackend } from 'utils/requests';

import './styles.css';

export type MovieFilterData = {
  category: Genre | null;
};

type Props = {
  onSubmitFilter: (data: MovieFilterData) => void;
};

const MovieFilter = ({ onSubmitFilter }: Props) => {
  const [selectCategories, setSelectCategories] = useState<Genre[]>([]);

  const { register, handleSubmit, setValue, getValues, control } =
    useForm<MovieFilterData>();

  const onSubmit = (formData: MovieFilterData) => {
    onSubmitFilter(formData);
  };

  const handleChangeCategory = (value: Genre) => {
    setValue('category', value);

    const obj: MovieFilterData = {
      category: getValues('category'),
    };

    onSubmitFilter(obj);
  };

  useEffect(() => {
    const params: AxiosRequestConfig = {
        method: 'GET',
        url: '/genres',
        withCredentials: true,
      };
  
    requestBackend(params).then((response) => {
      setSelectCategories(response.data);
    });
  }, []);

  return (
    <div className="base-card product-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="product-filter-form">
        <div className="product-filter-bottom-container">
          <div className="product-filter-category-container">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectCategories}
                  isClearable
                  placeholder="Genero"
                  classNamePrefix="product-filter-select"
                  onChange={(value) => handleChangeCategory(value as Genre)}
                  getOptionLabel={(category: Genre) => category.name}
                  getOptionValue={(category: Genre) => String(category.id)}
                />
              )}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default MovieFilter;