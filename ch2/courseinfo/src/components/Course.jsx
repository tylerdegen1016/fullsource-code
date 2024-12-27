const Header = (props) => {
    return(
      <h1>{props.course}</h1>
    )
  }
  
  const Content = ({parts}) => {
    return(
      parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id}/>)
    )
  
  }
  
  const Part = ({name, exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>
    )
  }


  const Sum = ({parts}) => {
    var sum = 0;
    parts.forEach((part) => {
        sum += part.exercises
    })

    var sumReduced = 0;
    sumReduced = parts.reduce((accumulator, currentVal) => {
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
      <Sum parts={parts} />
    </div>
    )
  }



export default Course