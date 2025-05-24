import cities from "../../utils/cities.json";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

import { Grid } from "@mui/material"

export default function AddressForm() {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedCity = watch("il");
  const selectedCityObj = cities.find((c) => c.il === selectedCity);
  const districts =
    selectedCityObj && Array.isArray(selectedCityObj["ilçe"])
      ? selectedCityObj["ilçe"]
      : [];

  return (
    <Grid container columns={12} columnSpacing={3} rowSpacing={3}>
      {/* Şehir (il) Seçimi */}
      <Grid columnspan={{ xs: 12, md: 6 }}>
        <Controller
          name="il"
          control={control}
          rules={{ required: "İl seçimi zorunlu" }}
          render={({ field }) => (
            <FormControl fullWidth size="small" error={!!errors.il}>
              <InputLabel>İl</InputLabel>
              <Select
                {...field}
                label="İl"
                value={field.value ?? ""}
                onChange={(e) => {
                  field.onChange(e);
                  setValue("ilce", ""); // İl değişince ilçe sıfırlanır
                }}
              >
                {cities.map((city) => (
                  <MenuItem key={city.il} value={city.il}>
                    {city.il}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="caption" color="error">
                {errors.il?.message}
              </Typography>
            </FormControl>
          )}
        />
      </Grid>

      {/* İlçe Seçimi */}
      <Grid columnspan={{ xs: 12, md: 6 }}>
        <Controller
          name="ilce"
          control={control}
          rules={{ required: "İlçe seçimi zorunlu" }}
          render={({ field }) => (
            <FormControl
              fullWidth
              size="small"
              error={!!errors.ilce}
              disabled={!selectedCity}
            >
              <InputLabel>İlçe</InputLabel>
              <Select {...field} label="İlçe" value={field.value ?? ""}>
                {districts.map((district) => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="caption" color="error">
                {errors.ilce?.message}
              </Typography>
            </FormControl>
          )}
        />
      </Grid>
    </Grid>
  );
}
