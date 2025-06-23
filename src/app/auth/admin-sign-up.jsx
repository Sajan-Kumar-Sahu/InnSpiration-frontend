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
import React, { useState } from 'react';
import { Link } from 'react-router';
import { PATHS } from '@/config/path.config';
import { useAdminSignUpForm } from './hooks/use-admin-sign-up-form';
import { Eye, EyeOff } from 'lucide-react';

const AdminSignUp = () => {
  const { form, handleSignUpSubmit, pending } = useAdminSignUpForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Registration</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignUpSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-10 rounded" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
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

            <Button type="submit" className="w-full h-10" disabled={pending}>
              Register as Hotel Manager
            </Button>
          </form>
        </Form>

        <div className="flex items-center justify-center mt-6">
          <span className="text-sm">
            Already have an account?{' '}
            <Link to={PATHS.ADMIN_SIGN_IN} className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
