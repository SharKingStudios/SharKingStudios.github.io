import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { Textarea } from '@/components/ui/textarea';
import {
  type ContactFormValues,
  type ContactFormTranslations,
  contactFormSchema,
} from '../type';
import { setGlobalZodErrorMap } from '@/i18n/zodErrorMap';
import type { LanguageCode } from '@/i18n/ui';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';

interface ContactFormProps {
  lang: LanguageCode;
  formTranslations: ContactFormTranslations;
  onSubmitSuccess?: () => void; // Optional callback for successful submission
}

export function ContactForm({
  lang,
  formTranslations,
  onSubmitSuccess,
}: ContactFormProps) {
  useEffect(() => {
    setGlobalZodErrorMap(lang);
  }, [lang]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
    mode: 'onBlur',
  });

  function buildGitHubIssueUrl(values: ContactFormValues) {
    const issueBaseUrl =
      import.meta.env.PUBLIC_CONTACT_ISSUE_URL ||
      'https://github.com/SharKingStudios/SharKingStudios.github.io/issues/new';
    const fullName = `${values.firstName} ${values.lastName}`.trim();
    const issueBodyLines = [
      '## Contact Form Submission',
      '',
      `**Name:** ${fullName}`,
    ];

    if (values.email) {
      issueBodyLines.push(`**Email:** ${values.email}`);
    }

    issueBodyLines.push('', '## Message', '', values.message);

    const params = new URLSearchParams({
      title: `Contact form: ${fullName}`,
      body: issueBodyLines.join('\n'),
    });

    return `${issueBaseUrl}?${params.toString()}`;
  }

  async function onSubmit(values: ContactFormValues) {
    const issueUrl = buildGitHubIssueUrl(values);
    const openedWindow = window.open(issueUrl, '_blank');

    if (openedWindow) {
      openedWindow.opener = null;
      toast.success('Opening GitHub so this message can be recorded.');
      form.reset();
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
      return;
    }

    window.location.assign(issueUrl);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formTranslations.firstNameLabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={formTranslations.firstNamePlaceholder}
                    {...field}
                  />
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
                <FormLabel>{formTranslations.lastNameLabel}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={formTranslations.lastNamePlaceholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formTranslations.emailLabel}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={formTranslations.emailPlaceholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formTranslations.messageLabel}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={formTranslations.messagePlaceholder}
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <>
              <Send className="mr-2 size-4" />
              {formTranslations.sendButtonLabel}
            </>
          )}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Submitting opens a prefilled GitHub issue, which keeps a record of
          your message.
        </p>
      </form>
    </Form>
  );
}
