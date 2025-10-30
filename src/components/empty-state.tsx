import { cn } from '@/lib/utils';

type EmptyStateProps = {
  id?: string;
  title: string;
  description?: string;
  className?: string;
};

export function EmptyState({
  id,
  title,
  description,
  className,
}: EmptyStateProps) {
  return (
    <div
      id={id}
      key={id}
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center bg-card rounded-lg border-muted border-2 border-dashed gap-3',
        className
      )}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
