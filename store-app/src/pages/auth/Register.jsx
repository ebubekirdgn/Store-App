import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import requests from "../../api/apiClient";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const formFields = [
  {
    name: "username",
    label: "Enter username",
    validation: {
      required: "username zorunlu alan",
      minLength: {
        value: 3,
        message: "username min. 3 karakter olmalıdır.",
      },
    },
  },
  {
    name: "email",
    label: "Enter email",
    validation: {
      required: "email zorunlu alan",
      minLength: {
        value: 3,
        message: "email min. 3 karakter olmalıdır.",
      },
    },
  },
  {
    name: "password",
    label: "Enter password",
    type: "password",
    validation: {
      required: "password zorunlu alan",
      minLength: {
        value: 6,
        message: "password min. 6 karakter olmalıdır.",
      },
    },
  },
];

function RegisterPage() {
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState } = useForm({
    defaultValues: formFields.reduce((acc, field) => ({
      ...acc,
      [field.name]: "",
    }), {}),
    
    mode: 'onChange', // Add validation mode for better UX
  });

  const { errors, isValid } = formState;

  const handleFormSubmit = async (data) => {
    try {
      await requests.account.register(data);
      toast.success("Kayıt başarılı! Giriş yapabilirsiniz.");
      navigate("/login");
    } catch (error) {
      toast.error("Kayıt sırasında bir hata oluştu.");
      console.error("Registration error:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper sx={{ padding: '24px' }} elevation={3}>
        <Box sx={{ display: 'flex', flexDirection:'column', alignItems:'center' }}>
          <Avatar sx={{ mb:'16px', bgcolor:'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          
          <Typography component="h1" variant="h5" sx={{ mb:'16px' }}>
            Register
          </Typography>
          
          <Box 
            component="form" 
            onSubmit={handleSubmit(handleFormSubmit)}
            noValidate
            sx={{ width:'100%' }}
          >
            {formFields.map((field) => (
              <TextField
                key={field.name}
                {...register(field.name, field.validation)}
                label={field.label}
                type={field.type || 'text'}
                size="small"
                fullWidth
                autoFocus={field.name === 'username'}
                sx={{ mb:'16px' }}
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message}
              />
            ))}
            
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!isValid}
              color="secondary"
              sx={{ mt:'8px' }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default RegisterPage;
