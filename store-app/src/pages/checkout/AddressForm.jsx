import cities from "../../utils/cities.json";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
} from "@mui/material";

import { Grid } from "@mui/material";

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
    <Grid container spacing={3}>
      {/* İlk satır: İl ve İlçe dropdownları */}
      <Grid size={{ xs: 12, md: 6 }}>
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
      <Grid size={{ xs: 12, md: 6 }}>
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

      {/* İkinci satır: Tam adres */}
      <Grid size={{ xs: 12, md: 12 }}>
        <Controller
          name="address"
          control={control}
          rules={{
            required: "Adres zorunlu",
            maxLength: {
              value: 250,
              message: "Adres en fazla 250 karakter olmalı",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Adres"
              multiline
              minRows={2}
              maxRows={4}
              fullWidth
              inputProps={{ maxLength: 250 }}
              error={!!errors.address}
              helperText={
                errors.address?.message || `${field.value?.length || 0}/250`
              }
              sx={{ mt: 2 }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
