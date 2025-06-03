import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface SignupFormData {
  email: string;
  password: string;
  name: string;
  role: 'engineer' | 'manager';
  department: string;
  skills?: string;
  seniority?: 'junior' | 'mid' | 'senior';
  maxCapacity?: number;
}

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>();
  const role = watch('role');

  const onSubmit = async (data: SignupFormData) => {
    try {
      const skillsArray = data.skills ? data.skills.split(',').map(s => s.trim()) : [];
      await signup(
        data.email,
        data.password,
        data.name,
        data.role,
        data.department,
        skillsArray,
        data.seniority,
        data.maxCapacity
      );
    } catch (error) {
      console.error(error);
      alert('Signup failed');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div>
            <Input
              placeholder="Name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <Select {...register('role', { required: 'Role is required' })}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="engineer">Engineer</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>
          <div>
            <Input
              placeholder="Department"
              {...register('department', { required: 'Department is required' })}
            />
            {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
          </div>
          {role === 'engineer' && (
            <>
              <div>
                <Input
                  placeholder="Skills (comma-separated)"
                  {...register('skills')}
                />
              </div>
              <div>
                <Select {...register('seniority')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select seniority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="mid">Mid</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Max Capacity (e.g., 100)"
                  {...register('maxCapacity', { valueAsNumber: true })}
                />
              </div>
            </>
          )}
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Signup;