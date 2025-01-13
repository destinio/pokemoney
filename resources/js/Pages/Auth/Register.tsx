import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <form className="mt-32 flex flex-col gap-4" onSubmit={submit}>
        <div className="flex flex-col gap-4">
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            name="name"
            value={data.name}
            className=""
            autoComplete="name"
            isFocused={true}
            onChange={(e) => setData('name', e.target.value)}
            required
          />

          <InputError message={errors.name} className="" />
        </div>

        <div className="flex flex-col gap-4">
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className=""
            autoComplete="username"
            onChange={(e) => setData('email', e.target.value)}
            required
          />

          <InputError message={errors.email} className="" />
        </div>

        <div className="flex flex-col gap-4">
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className=""
            autoComplete="new-password"
            onChange={(e) => setData('password', e.target.value)}
            required
          />

          <InputError message={errors.password} className="" />
        </div>

        <div className="flex flex-col gap-4">
          <InputLabel
            htmlFor="password_confirmation"
            value="Confirm Password"
          />

          <TextInput
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className=""
            autoComplete="new-password"
            onChange={(e) => setData('password_confirmation', e.target.value)}
            required
          />

          <InputError message={errors.password_confirmation} className="" />
        </div>

        <div className="flex flex-col gap-4">
          <Link href={route('login')} className="">
            Already registered?
          </Link>
        </div>

        <div className="flex gap-4">
          <PrimaryButton className="" disabled={processing}>
            Register
          </PrimaryButton>
          <Link href={'/'} as="button" className="">
            Cancel
          </Link>
        </div>
      </form>
    </GuestLayout>
  );
}
