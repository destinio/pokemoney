import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && <div className="">{status}</div>}

      <form className="mt-32 flex flex-col gap-4" onSubmit={submit}>
        <div className="flex flex-col gap-4">
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className=""
            autoComplete="username"
            isFocused={true}
            onChange={(e) => setData('email', e.target.value)}
          />

          <InputError message={errors.email} className="" />
        </div>

        <div className="flex flex-col gap-2">
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className=""
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
          />

          <InputError message={errors.password} className="" />
        </div>

        <div className="flex gap-2">
          <label className="align-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
            />
            <span className="">Remember me</span>
          </label>
        </div>

        <div className="flex flex-col gap-4">
          {canResetPassword && (
            <Link href={route('password.request')} className="">
              Forgot your password?
            </Link>
          )}
        </div>

        <div></div>

        <div className="flex gap-2">
          <PrimaryButton className="" disabled={processing}>
            Log in
          </PrimaryButton>
          <Link href={'/'} as="button" className="">
            Cancel
          </Link>
        </div>
      </form>
    </GuestLayout>
  );
}
