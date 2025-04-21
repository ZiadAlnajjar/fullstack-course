import { FormControl, InputLabel, Rating } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { UseObjectStateReturn } from "../../hooks/useObjectState.ts";
import { HealthCheck } from "../../types.ts";
import { SyntheticEvent } from "react";
import { calculateRating, isHealthCheckRating } from "../../utils.ts";

interface Props {
    fields: UseObjectStateReturn<HealthCheck>
}

const HealthCheckFields = ({ fields }: Props) => {
  const onRatingChange = (
    e: SyntheticEvent<Element, Event>, value: number | null
  ) => {
    e.preventDefault();

    const rating = value && calculateRating(value);

    if (!isHealthCheckRating(rating)) return;

    fields.set({ healthCheckRating: rating });
  };

  return (
    <>
      <FormControl fullWidth margin='normal' style={{ marginTop: 30 }}>
        <InputLabel shrink required style={{ top: -10, left: -10 }}>Health Check Rating</InputLabel>
        <Rating
          name='simple-controlled'
          value={calculateRating(fields.state.healthCheckRating)}
          onChange={onRatingChange}
          defaultValue={2}
          max={4}
          icon={<FavoriteIcon fontSize='inherit' color='error' />}
          emptyIcon={<FavoriteBorderIcon fontSize='inherit'/>}
        />
      </FormControl>
    </>
  );
};

export default HealthCheckFields;
