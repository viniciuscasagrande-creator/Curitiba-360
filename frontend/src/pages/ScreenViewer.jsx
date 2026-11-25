import React from 'react';
import { useParams } from 'react-router-dom';
import WfCompleteSystem from '../components/wf/WfCompleteSystem';

export default function ScreenViewer() {
  const { slug } = useParams();
  return <WfCompleteSystem slug={slug || 'wf-002-dashboard'} />;
}
