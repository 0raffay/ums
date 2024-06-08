import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/Form";

import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schema/LoginSchema";

//Slice
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";

//api:
import { useUserLoginMutation } from "@/api/Auth/authApi";
import { useEffect } from "react";

export default function Login() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [userLogin, { data, error, isError, isLoading, isSuccess }] =
    useUserLoginMutation();

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      userLogin(values);
    } catch (err) {
      console.error("Failed to login: ", err);
    }
  }

  const dispatch = useDispatch();

  useEffect(()=> {
    if (isSuccess && data) {
      dispatch(login({ userData: data, token: data.token }));
    }
  }, [isSuccess, data])

  return (
    <Form {...form}>
      <div className="flex min-h-full max-w-md mx-auto flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        autoComplete="name"
                        placeholder="Username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <div className="mt-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <div className="flex-1"></div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="underline font-semibold leading-6 text-foreground hover:text-secondary-foreground"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Button
                type="submit"
                size={"lg"}
                className="w-full"
                loading={isLoading}
              >
                Sign in
              </Button>
              {isError && (
                <FormDescription className="text-destructive font-[14px] font-bold absolute -bottom-8">
                  {error?.data?.message}
                </FormDescription>
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <a
              href="#"
              className="underline font-semibold leading-6 text-foreground hover:text-secondary-foreground"
            >
              Register Now
            </a>
          </p>
        </div>
      </div>
    </Form>
  );
}
