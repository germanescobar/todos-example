import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

test('tasks render correctly', async () => {
  global.fetch = jest.fn().mockImplementationOnce(() => {
    return Promise.resolve({
      json: () => Promise.resolve([
        { id: 1, title: "Tarea 1", completed: false },
        { id: 2, title: "Tarea 2", completed: false },
        { id: 3, title: "Tarea 3", completed: true }
      ])
    })
  })

  render(<App />)
  const todo = screen.getByTestId("todo");
  let tasks = await within(todo).findAllByRole("listitem")
  expect(tasks.length).toBe(2)

  const done = screen.getByTestId("done");
  tasks = await within(done).findAllByRole("listitem")
  expect(tasks.length).toBe(1)
});

test('create a task', async () => {
  global.fetch = jest.fn().mockImplementationOnce(() => {
    return Promise.resolve({
      json: () => Promise.resolve([])
    })
  })

  render(<App />)

  global.fetch.mockImplementationOnce(() => {
    return Promise.resolve({
      json: () => Promise.resolve({ id: 1, title: "Tarea 1", completed: false})
    })
  })

  const input = screen.getByRole("textbox")
  userEvent.type(input, "Tarea 4{Enter}")

  const container = within(screen.getByTestId("todo"))
  let tasks = await container.findAllByRole("listitem")
  expect(tasks.length).toBe(1)
})
