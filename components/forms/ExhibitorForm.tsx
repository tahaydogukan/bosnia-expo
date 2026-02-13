'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { exhibitorFormSchema, ExhibitorFormValues } from '@/lib/validations';
import { SERVICE_AREAS, PARTICIPATION_INTENTS, COUNTRIES } from '@/types';

interface ExhibitorFormProps {
  onSubmit: (data: ExhibitorFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export default function ExhibitorForm({
  onSubmit,
  isSubmitting,
}: ExhibitorFormProps) {
  const form = useForm<ExhibitorFormValues>({
    resolver: zodResolver(exhibitorFormSchema),
    defaultValues: {
      company_name: '',
      contact_name: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      website: '',
      service_area: '',
      participation_intent: '',
      terms_accepted: false,
      website_url: '', // Honeypot
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          {...form.register('website_url')}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name *</FormLabel>
              <FormControl>
                <Input placeholder="Your Company Ltd." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Person *</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="contact@company.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone *</FormLabel>
                <FormControl>
                  <Input placeholder="+1 234 567 8900" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City *</FormLabel>
                <FormControl>
                  <Input placeholder="Your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website (optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://yourcompany.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="service_area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Area *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your service area" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SERVICE_AREAS.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="participation_intent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Participation Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="How do you want to participate?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PARTICIPATION_INTENTS.map((intent) => (
                    <SelectItem key={intent} value={intent}>
                      {intent}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms_accepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal">
                  I accept the{' '}
                  <a
                    href="/terms"
                    target="_blank"
                    className="text-primary underline"
                  >
                    Terms of Service
                  </a>
                  ,{' '}
                  <a
                    href="/privacy"
                    target="_blank"
                    className="text-primary underline"
                  >
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a
                    href="/exhibitor-terms"
                    target="_blank"
                    className="text-primary underline"
                  >
                    Exhibitor Agreement
                  </a>{' '}
                  *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Apply as Exhibitor'
          )}
        </Button>
      </form>
    </Form>
  );
}
