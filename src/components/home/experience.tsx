import Image from "next/image";
import { Disclosure, Label, Panel, StatusDot, Tag, TextLink } from "@/components/ds";
import { education, workExperience } from "@/lib/resume";

type Work = (typeof workExperience)[number] & {
  websiteUrl?: string;
  relatedLinks?: readonly { label: string; url: string }[];
};

function Logo({ src, name }: { src: string; name: string }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center border border-line bg-fill">
      <Image src={src} alt={`${name} logo`} width={28} height={28} className="media-mono size-7 object-contain" />
    </span>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-4 text-xs leading-relaxed text-muted-foreground marker:text-muted-foreground">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function Experience() {
  const jobs: readonly Work[] = workExperience;
  return (
    <Panel
      id="experience"
      label="Log // Experience"
      meta={`Total: ${String(jobs.length).padStart(2, "0")}`}
      footer={
        <>
          <Label>Sheet 06</Label>
          <Label>Newest first</Label>
        </>
      }
    >
      {jobs.map((job) => (
        <Disclosure
          key={job.id}
          summary={
            <span className="flex items-center gap-4">
              <Logo src={job.logo} name={job.company} />
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-x-2">
                  <span className="font-sans text-sm font-semibold">{job.position}</span>
                  <span className="text-sm text-muted-foreground">@ {job.company}</span>
                  {job.current && (
                    <span className="inline-flex items-center gap-2">
                      <StatusDot state="live" />
                      <Label tone="default">Current</Label>
                    </span>
                  )}
                </span>
                <Label as="p">
                  {job.startDate} – {job.endDate} · {job.location}
                </Label>
              </span>
            </span>
          }
          actions={
            (job.websiteUrl || job.relatedLinks) && (
              <>
                {job.websiteUrl && (
                  <TextLink href={job.websiteUrl} tone="muted">
                    <Label>Website</Label>
                  </TextLink>
                )}
                {job.relatedLinks?.map((link) => (
                  <TextLink key={link.url} href={link.url} tone="muted">
                    <Label>{link.label}</Label>
                  </TextLink>
                ))}
              </>
            )
          }
        >
          <div className="flex flex-col gap-4">
            <Bullets items={job.responsibilities} />
            <ul className="flex flex-wrap gap-2">
              {job.technologies.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </Disclosure>
      ))}
    </Panel>
  );
}

export function Education() {
  return (
    <Panel
      id="education"
      label="Log // Education"
      meta={`Total: ${String(education.length).padStart(2, "0")}`}
      footer={
        <>
          <Label>Sheet 07</Label>
          <Label>Alwar, Rajasthan</Label>
        </>
      }
    >
      {education.map((school) => (
        <Disclosure
          key={school.id}
          summary={
            <span className="flex items-center gap-4">
              <Logo src={school.logo} name={school.institution} />
              <span className="min-w-0">
                <span className="block font-sans text-sm font-semibold">{school.institution}</span>
                <span className="block text-xs text-muted-foreground">
                  {school.degree} · {school.field}
                </span>
                <Label as="p">
                  {school.startDate} – {school.endDate} · {school.location}
                </Label>
              </span>
            </span>
          }
        >
          <Bullets items={[school.description, ...school.achievements]} />
        </Disclosure>
      ))}
    </Panel>
  );
}
