import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      size: {
        default: "px-4 py-2",
        large: "px-4 py-4",
      },
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ size, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ size, className }))}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 border-b pb-2 mb-3", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const titleVariants = cva("font-semibold tracking-tight", {
  variants: {
    size: {
      default: "text-2xl leading-none",
      lg: "text-5xl leading-none mb-4",
      md: "text-2xl leading-none",
      sm: "text-lg leading-none",
    },
  },
});

export interface TitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {}

const CardTitle = React.forwardRef<HTMLParagraphElement, TitleProps>(
  ({ size, className, ...props }, ref) => (
    <h3 ref={ref} className={cn(titleVariants({ size, className }))} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
