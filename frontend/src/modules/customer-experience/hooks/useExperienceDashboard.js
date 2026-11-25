import { useState, useEffect, useCallback } from "react";
import { customerExperienceService } from "../services/customerExperienceService";

export function useExperienceDashboard() {
  const [summary, setSummary] = useState(null);
  const [channels, setChannels] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [segments, setSegments] = useState([]);
  const [loyaltyTransactions, setLoyaltyTransactions] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await customerExperienceService.getDashboard();
    if (res.success && res.data) {
      const { summary, channels, campaigns, alerts, customers, conversations, segments, loyaltyTransactions, coupons } = res.data;
      setSummary(summary || null);
      setChannels(channels || []);
      setCampaigns(campaigns || []);
      setAlerts(alerts || []);
      setCustomers(customers || []);
      setConversations(conversations || []);
      setSegments(segments || []);
      setLoyaltyTransactions(loyaltyTransactions || []);
      setCoupons(coupons || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveCustomer = async (customer) => {
    const res = await customerExperienceService.saveCustomer(customer);
    if (res.success && res.data) {
      setCustomers(res.data.customers);
      setSummary(res.data.summary);
    }
  };

  const saveCampaign = async (campaign) => {
    const res = await customerExperienceService.saveCampaign(campaign);
    if (res.success && res.data) {
      setCampaigns(res.data.campaigns);
    }
  };

  const saveCoupon = async (coupon) => {
    const res = await customerExperienceService.saveCoupon(coupon);
    if (res.success && res.data) {
      setCoupons(res.data.coupons);
    }
  };

  return {
    summary,
    channels,
    campaigns,
    alerts,
    customers,
    conversations,
    segments,
    loyaltyTransactions,
    coupons,
    loading,
    saveCustomer,
    saveCampaign,
    saveCoupon,
    reload: loadData
  };
}
