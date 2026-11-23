import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { PiBrowser } from "react-icons/pi";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "none";
  padding?: "none" | "sm" | "md";
}

export function Card({
  className,
  variant = "default",
  padding = "sm",
  children,
  ...props
}: CardProps) {
  if (!children) {
    return (
      <>
        {/* Card */}
        <Card variant={variant} padding="sm" className={className} {...props}>
          {/* Card Content */}
          <CardContent variant="default">
            {/* Card Content - Header */}
            <div className="flex justify-between items-center w-full">
              <span className="text-xs font-bold tracking-[0.14em] uppercase text-[#545454]">
                Header
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#E2E8F0]/80 flex items-center justify-center text-[#64748B]">
                <PiBrowser size={18} />
              </div>
            </div>
            {/* Card Content - Body */}
            <div className="text-5xl font-extrabold text-[#1E1E1E]">Body</div>
            <div className="text-xs font-medium text-[#757575]">
              Description
            </div>
          </CardContent>
          {/* Card Footer */}
          <CardFooter text="Footer" />
        </Card>
      </>
    );
  }

  return (
    <div
      className={cn(
        "rounded-[20px] transition-all duration-200 flex flex-col justify-between",
        variant === "default" &&
          "bg-[#F0F2F5] border border-gray-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.02)]",
        variant === "outline" && "bg-white border border-gray-200 shadow-xs",
        variant === "none" && "bg-transparent border-0",
        padding === "none" && "p-0",
        padding === "sm" && "p-2.5",
        padding === "md" && "p-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  action?: React.ReactNode;
  actionHref?: string;
  actionTo?: string;
  onActionClick?: () => void;
}

export function CardHeader({
  className,
  title,
  action,
  actionHref,
  actionTo,
  onActionClick,
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 w-full px-1 pt-1 pb-3",
        className,
      )}
      {...props}
    >
      {children ? (
        children
      ) : (
        <>
          {typeof title === "string" ? <CardTitle>{title}</CardTitle> : title}
          {(action || actionHref || actionTo || onActionClick) && (
            <CardAction href={actionHref} to={actionTo} onClick={onActionClick}>
              {action || (
                <ArrowRight className="w-4 h-4 text-gray-500 hover:text-gray-900" />
              )}
            </CardAction>
          )}
        </>
      )}
    </div>
  );
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: "sm" | "md" | "lg";
}

export function CardTitle({
  className,
  size = "lg",
  children,
  ...props
}: CardTitleProps) {
  return (
    <h3
      className={cn(
        "font-semibold text-[#757575] tracking-tight leading-snug",
        size === "sm" &&
          "text-[11px] uppercase tracking-[0.14em]",
        size === "md" && "text-base font-semibold",
        size === "lg" && "text-lg md:text-xl font-semibold",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({
  className,
  children,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={cn("text-xs text-[#667085] font-normal", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export interface CardActionProps extends React.HTMLAttributes<HTMLElement> {
  href?: string;
  to?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function CardAction({
  className,
  href,
  to,
  onClick,
  children,
  ...props
}: CardActionProps) {
  const defaultContent = children || <ArrowRight className="w-4 h-4" />;
  const commonClass = cn(
    "inline-flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors p-1 rounded-md",
    className,
  );

  if (to) {
    return (
      <Link
        to={to}
        className={commonClass}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {defaultContent}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={commonClass}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {defaultContent}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={commonClass}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {defaultContent}
      </button>
    );
  }

  return (
    <div className={commonClass} {...props}>
      {defaultContent}
    </div>
  );
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "none";
}

export function CardContent({
  className,
  variant = "default",
  children,
  ...props
}: CardContentProps) {
  return (
    <div
      className={cn(
        "w-full flex-1",
        variant === "default" &&
          "bg-white rounded-[14px] p-4.5 flex flex-col justify-between shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-transparent",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  href?: string;
  to?: string;
  onClick?: () => void;
  arrow?: boolean;
}

export function CardFooter({
  className,
  text = "Lihat lebih lengkap",
  href,
  to,
  onClick,
  arrow = true,
  children,
  ...props
}: CardFooterProps) {
  const content = children || (
    <div className="flex items-center justify-between w-full text-xs font-semibold text-[#757575] group-hover:text-gray-900 transition-colors">
      {arrow ? (
        <>
          <span>{text}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#475467] group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all" />
        </>
      ) : (
        children
      )}
    </div>
  );

  const baseClass = cn("w-full px-3 pt-3 pb-1 select-none", className);

  if (to) {
    return (
      <div className={baseClass} {...props}>
        <Link to={to} className="group block w-full">
          {content}
        </Link>
      </div>
    );
  }

  if (href) {
    return (
      <div className={baseClass} {...props}>
        <a href={href} className="group block w-full">
          {content}
        </a>
      </div>
    );
  }

  if (onClick) {
    return (
      <div className={baseClass} {...props}>
        <button
          type="button"
          onClick={onClick}
          className="group w-full text-left cursor-pointer"
        >
          {content}
        </button>
      </div>
    );
  }

  return (
    <div className={cn(baseClass, "cursor-default")} {...props}>
      {content}
    </div>
  );
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Action = CardAction;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
