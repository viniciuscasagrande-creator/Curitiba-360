import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { formatDateTime } from '../../reports/utils/reportUtils';

export default function ApprovalTimeline({ timeline = [] }) {
  return (
    <div className="space-y-4 text-left">
      <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
        Linha do Tempo (Workflow)
      </h3>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {timeline.map((item, idx) => (
          <div key={idx} className="relative flex items-start gap-3">
            <span
              className={`absolute -left-6 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-white ${
                item.completed
                  ? 'text-emerald-600'
                  : 'text-slate-300'
              }`}
            >
              {item.completed ? (
                <CheckCircle2 size={18} className="fill-emerald-100" />
              ) : (
                <Circle size={16} />
              )}
            </span>

            <div className="min-w-0">
              <strong
                className={`block text-xs font-black ${
                  item.completed ? 'text-slate-900' : 'text-slate-400'
                }`}
              >
                {item.step}
              </strong>

              {item.completed && (
                <div className="mt-0.5 text-[10px] text-slate-500 font-medium space-x-1">
                  <span>{formatDateTime(item.date)}</span>
                  {item.user && <span>• Por {item.user}</span>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
