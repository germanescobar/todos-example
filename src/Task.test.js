import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Task from './Task';

test('renders task', () => {
  const task = { id: 1, title: "Tarea 1", completed: false }
  render(<Task task={task} />)

  screen.getByRole("listitem")
  screen.getByText("Tarea 1")
})

test('delete task', () => {
  const deleteTask = jest.fn()
  const toggleTask = jest.fn()
  const task = { id: 1, title: "Tarea 1", completed: false }
  render(<Task task={task} deleteTask={deleteTask} toggleTask={toggleTask} />)

  userEvent.click(screen.getByRole("button"))

  expect(deleteTask.mock.calls.length).toBe(1)
  expect(toggleTask.mock.calls.length).toBe(0)
})

test('toggle task', () => {
  const deleteTask = jest.fn()
  const toggleTask = jest.fn()
  const task = { id: 1, title: "Tarea 1", completed: false }
  render(<Task task={task} deleteTask={deleteTask} toggleTask={toggleTask} />)

  userEvent.click(screen.getByRole("listitem"))

  expect(deleteTask.mock.calls.length).toBe(0)
  expect(toggleTask.mock.calls.length).toBe(1)
})