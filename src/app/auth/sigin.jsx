import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PATHS } from '@/config/path.config';
import React, { useState } from 'react';
import { Link } from 'react-router';
import { useSignInForm } from './hooks/use-sign-in-form';
import { Eye, EyeOff } from 'lucide-react';

const SingIn = () => {
  const { form, handleSignInSubmit, pending } = useSignInForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignInSubmit)}
          className="w-full mt-8 space-y-5"
        >
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} className="h-10 rounded" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            rules={{
              required: 'Password is required',
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      className="h-10 rounded pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-2 top-2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-10"
            disabled={pending}
          >
            Log in
          </Button>
        </form>
      </Form>

      <div className="flex items-center justify-center mt-6">
        <span className="text-sm">
          Don't have an account?{' '}
          <Link to={PATHS.SIGN_UP} className="text-primary hover:underline">
            Create Account
          </Link>
        </span>
      </div>
    </>
  );
};

export default SingIn;
