import { AUTH_TOKEN_KEY, setStorageItem } from '@/lib/storage-manager';
import { useAuthContext } from '@/lib/providers/auth-context-provider';
import { useNavigate } from 'react-router';
import useMutation from '@/lib/hooks/useMutation';
import API_CONFIG from '@/config/api.config';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminSignUpSchema } from '@/lib/validators/auth-form-validator';
import { toast } from 'sonner';
import { PATHS } from '@/config/path.config';

const useAdminSignUpForm = () => {
  const navigate = useNavigate();
  const { setAuthenticatedUser } = useAuthContext(); // ✅ Add this

  const { pending, mutate } = useMutation(API_CONFIG.AUTH.SIGN_UP, 'POST');

  const form = useForm({
    resolver: zodResolver(adminSignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  function handleSignUpSubmit(data) {
    const payload = { ...data, role: 'HOTEL_MANAGER' };

    mutate(payload, {
      onSuccess: (response) => {
        console.log(response);
        
        const token = response?.token; // Or response?.data?.token based on your API
        const user = response?.user;   // Same here

        if (token) {
          setStorageItem(AUTH_TOKEN_KEY, token); // store token
        }

        if (user) {
          setAuthenticatedUser({
            isAuthenticated: true,
            user: user,
          });
        }

        toast('Sign up successful', {
          description: 'You are now logged in!',
          type: 'success',
        });

        navigate(PATHS.ADMIN_SIGN_IN);
      },
      onError: (err) => {
        console.log(err);
        toast('Error: ' + (err.status || ''), {
          description: err.message,
          type: 'error',
        });
      },
    });
  }

  return { form, handleSignUpSubmit, pending };
};

export { useAdminSignUpForm };
