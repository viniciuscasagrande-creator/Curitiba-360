import { useState, useEffect, useCallback } from "react";
import { cmsService } from "../services/cmsService";

export function useCmsDashboard() {
  const [summary, setSummary] = useState(null);
  const [pages, setPages] = useState([]);
  const [banners, setBanners] = useState([]);
  const [redirects, setRedirects] = useState([]);
  const [experiments, setExperiments] = useState([]);
  const [personalizationRules, setPersonalizationRules] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [
      sumRes,
      pageRes,
      banRes,
      redRes,
      expRes,
      prRes,
      trRes,
      calRes
    ] = await Promise.all([
      cmsService.getSummary(),
      cmsService.getPages(),
      cmsService.getBanners(),
      cmsService.getRedirects(),
      cmsService.getExperiments(),
      cmsService.getPersonalizationRules(),
      cmsService.getTranslations(),
      cmsService.getCalendarEvents()
    ]);

    if (sumRes.success) setSummary(sumRes.data);
    if (pageRes.success) setPages(pageRes.data);
    if (banRes.success) setBanners(banRes.data);
    if (redRes.success) setRedirects(redRes.data);
    if (expRes.success) setExperiments(expRes.data);
    if (prRes.success) setPersonalizationRules(prRes.data);
    if (trRes.success) setTranslations(trRes.data);
    if (calRes.success) setCalendarEvents(calRes.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const savePage = async (page) => {
    const res = await cmsService.savePage(page);
    if (res.success) {
      setPages(res.data);
      const sumRes = await cmsService.getSummary();
      if (sumRes.success) setSummary(sumRes.data);
    }
  };

  const saveBanner = async (banner) => {
    const res = await cmsService.saveBanner(banner);
    if (res.success) {
      setBanners(res.data);
    }
  };

  const saveRedirect = async (red) => {
    const res = await cmsService.saveRedirect(red);
    if (res.success) {
      setRedirects(res.data);
    }
  };

  const saveExperiment = async (exp) => {
    const res = await cmsService.saveExperiment(exp);
    if (res.success) {
      setExperiments(res.data);
    }
  };

  const savePersonalizationRule = async (rule) => {
    const res = await cmsService.savePersonalizationRule(rule);
    if (res.success) {
      setPersonalizationRules(res.data);
    }
  };

  const updateTranslation = async (id, translation) => {
    const res = await cmsService.updateTranslation(id, translation);
    if (res.success) {
      setTranslations(res.data);
    }
  };

  return {
    summary,
    pages,
    banners,
    redirects,
    experiments,
    personalizationRules,
    translations,
    calendarEvents,
    loading,
    savePage,
    saveBanner,
    saveRedirect,
    saveExperiment,
    savePersonalizationRule,
    updateTranslation,
    reload: loadData
  };
}
