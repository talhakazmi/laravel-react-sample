import React from 'react';
import ReactDom from 'react-dom/client';
import Todo from './components/todo/List/Todo';
import '../css/app.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddTodo from './components/todo/Add/AddTodo';
import { ThemeProvider } from 'react-ui';

const queryClient = new QueryClient();
ReactDom.createRoot(document.getElementById('app') as HTMLElement).render(
    <React.StrictMode>
       <ThemeProvider>
       <div className='container justify-items-center mx-auto py-4'>
            <h1 className='text-4xl'>Task Managment</h1>
            <QueryClientProvider client={queryClient}>
                <AddTodo />
                <div className='pt-4 w-full'>
                    <Todo />
                </div>
            </QueryClientProvider>
        </div>
        </ThemeProvider>
    </React.StrictMode>
);