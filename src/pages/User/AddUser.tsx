import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/AlertDialog"


import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAddUserMutation } from "@/api/User";

import { UserSchema } from "@/schema/UserSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { useEffect, useState } from "react";
import { CheckCheck } from "lucide-react";
import { Link } from "react-router-dom";
import ROUTES from "@/router/routes";

export default function AddUser() {
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      hobbies: "",
    },
  });

  const [addUser, { isLoading, isSuccess }] = useAddUserMutation();

  const onSubmit = (values: z.infer<typeof UserSchema>) => {
    addUser(values);
    form.reset();
  };

  useEffect(()=> {
    if(isSuccess) {
      setSuccess(true)
    }
  }, [isSuccess])

  return (
    <Card size={"large"}>
      <CardHeader>
        <CardTitle size={"lg"}>Add User</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name*</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name*</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age*</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Age" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hobbies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" loading={isLoading}>
            Add User
          </Button>
        </form>
      </Form>

      <AlertDialog open={success} onOpenChange={setSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center flex justify-center gap-2">User Has been Added <CheckCheck className="text-green-700" /></AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              The user has been added succesfully.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="!justify-center w-full">
            <Button onClick={()=> setSuccess(false)} variant={"success"}>
              Okay!
            </Button>
            <Button asChild >
              <Link to={ROUTES.user_list}>
              View List
              </Link>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
