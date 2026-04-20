const Header = (props) => <h1>{props.course}</h1>

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Content = (props) => (
  <div>
    {props.parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </div>
)

const Course = (props) => (
  <div>
    <Header course={props.course.name} />
    <Content parts={props.course.parts} />
    <Total parts={props.course.parts} />
  </div>
)

const Total = (props) => {
  const total = props.parts.reduce((sum, part) => {return sum + part.exercises}, 0);
  return <p>
    <strong>
      Total of exercises: <u>{total}</u>
    </strong>
  </p>;
}

export default Course;