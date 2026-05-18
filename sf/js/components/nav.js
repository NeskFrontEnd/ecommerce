/**
 * Bottom navigation bar — redesign per spec.
 * 4 tabs: Головна, Плани, Історія, Профіль
 * Height: 76px, acid active color, dim inactive.
 */

import { navigate, onChange } from '../utils/router.js';

const NAV_ITEMS = [
  { id: 'home',     label: 'Головна', icon: 'icon-home',     path: '/' },
  { id: 'workouts', label: 'Плани',   icon: 'icon-dumbbell', path: '/workouts' },
  { id: 'history',  label: 'Історія', icon: 'icon-calendar', path: '/history' },
  { id: 'profile',  label: 'Профіль', icon: 'icon-person',   path: '/profile' },
];

let navEl = null;

export function initNav() {
  navEl = document.getElementById('bottom-nav');
  if (!navEl) return;
  render('/');
  onChange(route => render(route.path));
}

export function showNav() {
  if (navEl) navEl.classList.remove('hidden');
}

export function hideNav() {
  if (navEl) navEl.classList.add('hidden');
}

function render(currentPath) {
  if (!navEl) return;
  navEl.innerHTML = NAV_ITEMS.map(item => {
    const isActive = item.path === '/'
      ? currentPath === '/'
      : currentPath.startsWith(item.path);
    return `
      <button class="sf-nav-item ${isActive ? 'active' : ''}" data-nav-path="${item.path}" aria-label="${item.label}">
        <svg class="icon" style="width:22px;height:22px" aria-hidden="true"><use href="#${item.icon}"/></svg>
        <span class="sf-nav-label">${item.label}</span>
      </button>`;
  }).join('');

  navEl.querySelectorAll('[data-nav-path]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.navPath));
  });
}
