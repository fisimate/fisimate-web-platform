import Link from "next/link";

export default function Banks() {
  return (
    <div className="">
      <ul>
        <li>
          <Link href={"/banks/exams"}>ExamBank</Link>
        </li>
        <li>
          <Link href={"/banks/formulas"}>FormulaBank</Link>
        </li>
        <li>
          <Link href={"/banks/materials"}>MaterialBank</Link>
        </li>
      </ul>
    </div>
  );
}
