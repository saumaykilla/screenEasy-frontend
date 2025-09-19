"use client";
import { useAuth } from '@/hooks/useAuth';
import React from 'react'

const Dashboard = () => {
    const { profile } = useAuth();
    console.log(profile);
  return (
    <div></div>
  )
}

export default Dashboard