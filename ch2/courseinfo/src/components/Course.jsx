const Header = (props) => {
    return(
      <h1>{props.course}</h1>
    )
  }
  
  const Content = (props) => {
    return(
      <>
        <Part part={props.parts[0]}/>
        <Part part={props.parts[1]}/>
        <Part part={props.parts[2]}/>
      </>
    )
  
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
  }
  
  const Total = (props) => {
    return(
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    )
  }

  const Sum = ({parts}) => {
    var sum = 0;
    parts.forEach((part) => {
        sum += part.exercises
    })

    var sumReduced = 0;
    sumReduced = parts.reduce((accumulator, currentVal) => {
        console.log(accumulator, currentVal)
        return accumulator + currentVal.exercises;
    }, 0)
    return(
        <p><b>total of {sumReduced} exercises</b></p>
    )
  }

const Course = ({course, parts}) => {
    return(
      <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts}/>
      <Sum parts={parts} />
    </div>
    )
  }



export default Course