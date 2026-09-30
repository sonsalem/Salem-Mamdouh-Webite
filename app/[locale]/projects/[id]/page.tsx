import type { Metadata } from "next";
import ProjectDetails from "@/components/ProjectDetails";
import supabase from "@/config/supabaseClients";

type Params = Promise<{ locale: string; id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const { data } = await supabase.from("projects").select("name, features").eq("id", Number(id)).maybeSingle();
  return data
    ? { title: `${data.name} — Salem Mamdouh`, description: data.features }
    : { title: "Project — Salem Mamdouh" };
}

const page = async ({ params }: { params: Params }) => {
  const { id } = await params;
  return <ProjectDetails id={Number(id)} />;
};

export default page;
