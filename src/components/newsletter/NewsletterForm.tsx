import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { newsletterSchema } from "@/pages/api/newsletter";

// Types
type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Form component
const NewsletterForm = () => {
  // State
  const [loading, setLoading] = useState(false);

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  // Form submission handler
  const onSubmit = async (data: NewsletterFormData) => {
    setLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to subscribe");
      }

      // Success case
      toast.success("Successfully subscribed to our newsletter!");
      reset();
    } catch (error) {
      // Error case
      console.error("Newsletter subscription error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to subscribe",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="newsletter-form">
      <div className="input">
        <input
          type="email"
          id="newsletter-email"
          autoComplete="email"
          placeholder="Your Email Address"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
        />
      </div>

      <button
        className="button"
        type="submit"
        disabled={loading}
        aria-label="Subscribe to newsletter"
      >
        <i className={`${loading ? "loader" : "ic ic-mail-send"}`} />
      </button>
    </form>
  );
};

export default NewsletterForm;
