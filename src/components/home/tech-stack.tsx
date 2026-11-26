import { Label, Panel, Tag } from "@/components/ds";
import { CompanyLogo } from "@/components/magicui/company-logo";
import { skills } from "@/lib/resume";

const groups = [
  { label: "Frontend", items: skills.frontend },
  { label: "Backend", items: skills.backend },
  { label: "Database", items: skills.database },
  { label: "Tools", items: skills.tools },
] as const;

const total = groups.reduce((count, group) => count + group.items.length, 0);

export function TechStack() {
  return (
    <Panel
      id="stack"
      label="Spec // Tech_stack"
      meta={`Total: ${total}`}
      footer={
        <>
          <Label>Sheet 02</Label>
          <Label>{groups.length} groups</Label>
        </>
      }
    >
      {groups.map((group, index) => (
        <div key={group.label} className="grid border-b border-line last:border-b-0 md:grid-cols-4">
          <div className="flex items-center gap-2 bg-fill px-4 py-3 md:border-r md:border-line">
            <Label>{String(index + 1).padStart(2, "0")} {"//"}</Label>
            <Label tone="default">{group.label}</Label>
          </div>
          <div className="flex flex-wrap gap-2 p-4 md:col-span-3">
            {group.items.map((skill) => (
              <Tag key={skill.name} icon={<CompanyLogo name={skill.name} size={14} />}>
                {skill.name}
              </Tag>
            ))}
          </div>
        </div>
      ))}
    </Panel>
  );
}
