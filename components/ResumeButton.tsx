import { IconDownload } from "./Icons";

export default function ResumeButton({
  file,
  label,
  className = "btn btn-primary",
}: {
  file: string;
  label?: string;
  className?: string;
}) {
  return (
    <a className={className} href={`/resumes/${file}`} download>
      <IconDownload width={16} height={16} />
      {label ?? "Download resume"}
    </a>
  );
}
