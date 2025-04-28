import { cn } from '@/utils/cn';

type HeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  contentClassName?: string;
};

export function Header({
  children,
  className,
  icon,
  title,
  description,
  contentClassName,
  ...rest
}: HeaderProps) {
  return (
    <div className={className} {...rest}>
      <header className={cn('container mx-auto px-4 py-2')}>
        <div
          className={cn(
            'flex flex-col min-h-[3rem] gap-4 md:flex-row md:items-center md:justify-between md:gap-3',
          )}
        >
          <div className="flex gap-4 lg:gap-3.5">
            {icon}
            <div className="space-y-1">
              <div className="text-label-md lg:text-label-lg">{title}</div>
              <div className="text-paragraph-sm text-text-sub-600">
                {description}
              </div>
            </div>
          </div>
          <div className="flex-1 justify-center flex">
            <SearchMenuInput className="w-full max-w-[32rem]" />
          </div>
          <div className={cn('flex items-center gap-3', contentClassName)}>
            <SelectLanguage />

            <NotificationButton className="flex" />

            {children}
          </div>
        </div>
      </header>
      <Divider.Root />
    </div>
  );
}
