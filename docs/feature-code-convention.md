# Feature Code Convention

This document establishes code conventions and standards for feature development in the admin-frontend application. These conventions ensure consistency, maintainability, and collaboration among team members.

## Table of Contents

1. [Directory Structure and Organization](#directory-structure-and-organization)
2. [Naming Conventions](#naming-conventions)
3. [Component Guidelines](#component-guidelines)
4. [Hooks Guidelines](#hooks-guidelines)
5. [Services Guidelines](#services-guidelines)
6. [State Management](#state-management)
7. [Data Modeling and Types](#data-modeling-and-types)
8. [Logic Separation](#logic-separation)
9. [Testing Guidelines](#testing-guidelines)
10. [Documentation](#documentation)

## Directory Structure and Organization

Each feature follows a feature-based organization pattern with clear separation of concerns:

```
src/features/[feature-name]/
├── components/         # UI components specific to the feature
├── hooks/              # Custom hooks for feature-related logic
├── services/           # API service functions
└── types/              # TypeScript interfaces and types
```

### Guidelines

1. **Feature-based organization**: Each feature should be self-contained with its own components, hooks, services, and types.
2. **Cohesion**: Files should be grouped by feature, not by technical role.
3. **Minimal cross-feature dependencies**: Features should be as independent as possible, with explicit imports when needed.

### Example

```
src/features/users/
├── components/
│   ├── user-form.tsx         # Form component for creating/editing users
│   └── user-list.tsx         # List component for displaying users
├── hooks/
│   ├── use-user-by-id.ts     # Hook for retrieving a user by ID
│   ├── use-user-create.ts    # Hook for creating a user
│   ├── use-user-delete.ts    # Hook for deleting a user
│   ├── use-user-update.ts    # Hook for updating a user
│   └── use-users.ts          # Hook for listing users
├── services/
│   └── users-service.ts      # Service for user-related API calls
└── types/
    ├── create-user.ts        # Type for user creation
    ├── user-query-params.ts  # Types for user query parameters
    ├── user.ts               # Main user type definition
    └── update-user.ts        # Type for user updates
```

## Naming Conventions

### Files and Directories

1. **Component files**: Use kebab-case with descriptive names (e.g., `user-form.tsx`, `product-list.tsx`)
2. **Hook files**: Use kebab-case with `use` prefix (e.g., `use-users.ts`, `use-product-create.ts`)
3. **Type files**: Use kebab-case for files (e.g., `user-query-params.ts`) and PascalCase for the actual types
4. **Service files**: Use kebab-case with `-service` suffix (e.g., `users-service.ts`)

### Variables, Functions, and Components

1. **React components**: Use PascalCase (e.g., `UserForm`, `ProductList`)
2. **Custom hooks**: Use camelCase with `use` prefix (e.g., `useUsers`, `useProductCreate`)
3. **Interface/Type names**: Use PascalCase (e.g., `User`, `ProductQueryParams`, `ListItem`)
4. **Function names**: Use camelCase with descriptive verbs (e.g., `handleSubmit`, `mapDataToFormValues`)
5. **State variables**: Use camelCase, with descriptive names (e.g., `isOpen`, `selectedItems`)
6. **Boolean variables**: Prefix with `is`, `has`, or similar (e.g., `isSelected`, `hasChildren`)
7. **Constants**: Use UPPER_SNAKE_CASE for true constants (e.g., `QUERY_KEY.USERS`)

### Examples

```typescript
// Component naming
export function UserForm({ initialData }: UserFormProps) { ... }

// Hook naming
export const useProductCreate = () => { ... }

// Type naming
export interface ListItem {
  id: number;
  name: string;
  description: string;
  children?: ListItem[];
}

// Function naming
const handleSubmit = () => { ... }

// State variable naming
const [isOpen, setIsOpen] = React.useState(true);
const hasChildren = item.children && item.children.length > 0;
```

## Component Guidelines

### General Principles

1. **Function components**: Use function components with hooks, not class components
2. **Component scope**: Components should have a single responsibility
3. **Props interface**: Define a props interface for each component with descriptive names
4. **Composability**: Design components to be composable and reusable
5. **Controlled components**: Prefer controlled components over uncontrolled ones

### Component Structure

Each component should follow this general structure:

1. Import statements
2. Type definitions (interfaces, types)
3. Helper functions (if needed)
4. Component definition
5. Export statement

### Optimization

1. **Memoization**: Use React.memo for components that render frequently but with stable props
2. **Callback memoization**: Use useCallback for callbacks passed to child components
3. **State memoization**: Use useMemo for expensive computations

### Example

```tsx
// user-form.tsx
import { ... } from '...';

// Type definitions
interface UserFormProps {
  initialData?: Partial<User>;
}

type UserFormValues = z.infer<typeof userSchema>;

// Helper function
const mapUserToFormValues = (user: Partial<User>): UserFormValues => {
  return { ... };
};

// Component definition
export function UserForm({ initialData }: UserFormProps) {
  // Component implementation
}
```

## Hooks Guidelines

### General Principles

1. **Single responsibility**: Each hook should have a single, well-defined purpose
2. **Prefixing**: All hooks must start with the `use` prefix
3. **Return values**: Return an object with named properties for clarity
4. **Parameter naming**: Use descriptive parameter names
5. **Error handling**: Include proper error handling in all hooks

### Hook Patterns

#### Query Hooks

For data fetching, follow the TanStack Query pattern with queryOptions and useQuery:

```typescript
// Query options function
const usersQueryOptions = (params: UserQueryParams) =>
  queryOptions({
    queryKey: [QUERY_KEY.USERS, params],
    queryFn: ({ signal }) =>
      userApi
        .getUsers(params, signal)
        .then(({ data }) => Paginated.fromV3(data)),
    placeholderData: keepPreviousData,
  });

// Hook that uses the options
export const useUsers = (params: UserQueryParams) =>
  useQuery(usersQueryOptions(params));
```

#### Mutation Hooks

For data mutations, follow this pattern:

```typescript
export const useUserCreate = () => {
  const { t } = useTranslation();
  const mutation = useMutation({
    mutationFn: (data: CreateUser) => userApi.createUser(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USERS],
        refetchType: 'all',
      });
    },
  });

  return {
    ...mutation,
    mutateAsync: (data: CreateUser) =>
      toast.promise(mutation.mutateAsync(data), {
        loading: t('creating'),
        success: t('success'),
        error: (error) => {
          return getErrorMessage(error.response.data);
        },
      }),
  };
};
```

## Services Guidelines

1. **API encapsulation**: Services should encapsulate all API calls
2. **Service naming**: Name services with a `-service` suffix
3. **Method naming**: Use descriptive verbs for service methods
4. **Return types**: Explicitly define return types for all service methods
5. **Error handling**: Services should not handle errors, but pass them to hooks

Example:

```typescript
// users-service.ts
export const usersService = {
  getUsers: async (params: UserQueryParams, signal?: AbortSignal) => {
    return api.get<PaginatedResponse<User>>('/users', { params, signal });
  },
  
  getUser: async (id: number, signal?: AbortSignal) => {
    return api.get<User>(`/users/${id}`, { signal });
  },
  
  createUser: async (data: CreateUser) => {
    return api.post<User>('/users', data);
  },
  
  updateUser: async (id: number, data: UpdateUser) => {
    return api.patch<User>(`/users/${id}`, data);
  },
  
  deleteUser: async (id: number) => {
    return api.delete(`/users/${id}`);
  }
};
```

## State Management

### Local Component State

1. **useState**: Use for simple state that belongs to a single component
2. **useReducer**: Use for complex state logic within a component
3. **Form state**: Use react-hook-form for form state management

### Global State

1. **React Query**: Use for server state (data fetching, caching, synchronization)
2. **Context API**: Use for theme, authentication, and other app-wide concerns
3. **URL state**: Use URL parameters for sharable and bookmarkable state

### Examples

#### Local State

```tsx
// Local component state
const [isOpen, setIsOpen] = React.useState(true);

// Form state with react-hook-form
const form = useForm<UserFormValues>({
  resolver: zodResolver(userSchema),
  defaultValues: initialData
    ? mapUserToFormValues(initialData)
    : {
        name: '',
        email: '',
        role: '',
      },
});
```

#### Server State

```tsx
// Server state with React Query
const { data: users = [], isFetching: isUserFetching } =
  useUsers(queryParams);
```

## Data Modeling and Types

1. **Type definition**: Define explicit types for all data models
2. **Schema validation**: Use Zod schemas for form validation
3. **Type inference**: Use type inference where appropriate (`typeof`, `infer`)
4. **Discriminated unions**: Use for complex state models
5. **Readonly types**: Use for immutable data

Examples:

```typescript
// Define explicit interface
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Zod schema for validation
const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  role: z.string().min(1, 'Role is required'),
});

// Type inference from schema
type UserFormValues = z.infer<typeof userSchema>;
```

## Logic Separation

### UI vs. Business Logic

1. **Separation of concerns**: Separate UI rendering from business logic
2. **Custom hooks**: Extract complex logic into custom hooks
3. **Helper functions**: Use for reusable utility functions
4. **Component responsibilities**: Components should focus on rendering and delegating events

### Example

```tsx
// Business logic in custom hook
export const useUserUpdate = () => {
  const { t } = useTranslation();
  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUser }) =>
      userApi.updateUser(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USERS],
        refetchType: 'all',
      });
    },
  });

  return {
    ...mutation,
    mutateAsync: ({ id, data }: { id: number; data: UpdateUser }) =>
      toast.promise(mutation.mutateAsync({ id, data }), {
        loading: t('updating'),
        success: t('success'),
        error: (error) => {
          return getErrorMessage(error.response.data);
        },
      }),
  };
};

// UI component using the hook
export function UserForm({ initialData }: UserFormProps) {
  const { mutateAsync: updateUser } = useUserUpdate();
  
  const onSubmit = async (data: UserFormValues) => {
    try {
      if (initialData?.id) {
        await updateUser({
          id: initialData.id,
          data: { ...data },
        });
      }
      // ...
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };
  
  // Rendering logic
}
```

## Testing Guidelines

1. **Component testing**: Test components with React Testing Library
2. **Hook testing**: Test custom hooks with @testing-library/react-hooks
3. **Service testing**: Test services with Jest mocks for API calls
4. **Test coverage**: Aim for high test coverage of critical paths
5. **Test structure**: Follow the AAA pattern (Arrange, Act, Assert)

### Example Test Structure

```typescript
// Component test
describe('UserForm', () => {
  it('should render correctly with initial data', () => {
    // Arrange
    const initialData = { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' };
    
    // Act
    render(<UserForm initialData={initialData} />);
    
    // Assert
    expect(screen.getByLabelText(/name/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/email/i)).toHaveValue('john@example.com');
  });
  
  it('should call updateUser when submitting with initial data', async () => {
    // Arrange
    const mockUpdateUser = jest.fn().mockResolvedValue({});
    jest.spyOn(userHooks, 'useUserUpdate').mockReturnValue({
      mutateAsync: mockUpdateUser,
      isPending: false,
    });
    
    // Act
    render(<UserForm initialData={{ id: 1 }} />);
    await userEvent.type(screen.getByLabelText(/name/i), 'Updated Name');
    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    
    // Assert
    expect(mockUpdateUser).toHaveBeenCalledWith({
      id: 1,
      data: expect.objectContaining({ name: 'Updated Name' }),
    });
  });
});
```

## Documentation

1. **Component documentation**: Document props, behavior, and usage examples
2. **Hook documentation**: Document parameters, return values, and side effects
3. **Code comments**: Add comments for complex logic and edge cases
4. **JSDoc**: Use JSDoc for public APIs and interfaces

### Example Documentation

```typescript
/**
 * User form component for creating and editing users
 * 
 * @param initialData - Optional initial user data for editing mode
 * @returns A form component for user creation/editing
 * 
 * @example
 * // Create mode
 * <UserForm />
 * 
 * // Edit mode
 * <UserForm initialData={existingUser} />
 */
export function UserForm({ initialData }: UserFormProps) {
  // Implementation
}
```

## UI Components

Each feature may have specific UI components tailored to its needs. Here are some general patterns to follow:

### Lists and Tables

- Use virtualized lists for large datasets
- Implement sort, filter, and pagination consistently
- Include empty states, loading states, and error states
- Handle row selection with clear visual indicators

### Forms

- Group related fields logically
- Provide clear validation feedback
- Include submit and cancel actions
- Support keyboard navigation
- Show loading indicators during submission

### Detail Views

- Organize information in logical sections
- Provide edit/delete actions where appropriate
- Include breadcrumbs for navigation context
- Handle loading and error states

## Improvement Recommendations

Based on common patterns, here are some recommendations for improvement:

1. **Consistent API response handling**: Standardize how API responses are processed across all hooks
2. **Enhanced TypeScript strictness**: Ensure all types are fully defined and no implicit any types
3. **Form refactoring**: Extract form fields into reusable components
4. **Testing coverage**: Add comprehensive tests for all components and hooks
5. **Documentation**: Add more inline documentation for complex components
6. **Performance optimization**: Add more memoization for expensive computations
7. **Accessibility improvements**: Ensure all UI components are fully accessible

## Conclusion

This document establishes code conventions for feature development. Following these guidelines will ensure consistency, maintainability, and collaboration across the development team. The document should be revisited and updated as the codebase evolves and new patterns emerge.