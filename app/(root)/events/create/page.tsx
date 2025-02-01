import EventForm from "@/components/shared/EventForm";
import { useAuth, useUser } from "@clerk/nextjs";

const CreateEvent = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  if (!isSignedIn) {
    return <p className="text-center text-red-500">You must be signed in to create an event.</p>;
  }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Create Event</h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={user?.id || ""} type="Create" />
      </div>
    </>
  );
};

export default CreateEvent;
