import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export default function PaymentForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => String(currentYear + i));

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("cardname", {
            required: "cardname zorunlu alan",
          })}
          label="Enter cardname"
          size="small"
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          error={!!errors.cardname}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("cardnumber", {
            required: "cardnumber zorunlu alan",
            minLength: { value: 19, message: "Kart numarası 16 haneli olmalı" }, // 16 rakam + 3 tire = 19 karakter
            maxLength: { value: 19, message: "Kart numarası 16 haneli olmalı" },
            pattern: {
              value: /^(\d{4}-){3}\d{4}$/,
              message: "Kart numarası 16 haneli ve doğru formatta olmalı",
            },
          })}
          label="Enter cardnumber"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.cardnumber}
          helperText={errors.cardnumber?.message}
          inputMode="numeric"
          onInput={(e) => {
            let value = e.target.value.replace(/\D/g, ""); // Sadece rakam
            value = value.slice(0, 16); // En fazla 16 rakam
            // Her 4 hanede bir tire ekle
            value = value.replace(/(.{4})/g, "$1-").replace(/-$/, "");
            e.target.value = value;
          }}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <Controller
          name="expirymonth"
          control={control}
          rules={{ required: "Ay seçimi zorunlu" }}
          render={({ field }) => (
            <FormControl fullWidth size="small" error={!!errors.expirymonth}>
              <InputLabel>Ay</InputLabel>
              <Select {...field} label="Ay">
                {months.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        {errors.expirymonth && (
          <span style={{ color: "red", fontSize: 12 }}>
            {errors.expirymonth.message}
          </span>
        )}
      </Grid>

      <Grid item xs={6} md={3}>
        <Controller
          name="expiryyear"
          control={control}
          rules={{ required: "Yıl seçimi zorunlu" }}
          render={({ field }) => (
            <FormControl fullWidth size="small" error={!!errors.expiryyear}>
              <InputLabel>Yıl</InputLabel>
              <Select {...field} label="Yıl">
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        {errors.expiryyear && (
          <span style={{ color: "red", fontSize: 12 }}>
            {errors.expiryyear.message}
          </span>
        )}
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("cvv", {
            required: "cvv zorunlu alan",
            minLength: { value: 3, message: "CVV 3 haneli olmalı" },
            maxLength: { value: 3, message: "CVV 3 haneli olmalı" },
            pattern: {
              value: /^[0-9]{3}$/,
              message: "CVV sadece rakam olmalı",
            },
          })}
          label="Enter cvv"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.cvv}
          helperText={errors.cvv?.message}
          type="tel"
          inputMode="numeric"
          onInput={(e) => {
            // Sadece rakam ve 3 karakter sınırı
            e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 3);
          }}
        />
      </Grid>
    </Grid>
  );
}
