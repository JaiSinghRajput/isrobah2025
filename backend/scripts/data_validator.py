#!/usr/bin/env python3
"""
Data Validation Module
=====================

Utilities for validating SWIS data quality and CME catalog integrity.
"""

import pandas as pd
import numpy as np
import logging
from pathlib import Path
from typing import Dict, List, Tuple

logger = logging.getLogger(__name__)

class DataValidator:
    """Validator for SWIS and CME catalog data."""
    
    def validate_swis_data(self, df: pd.DataFrame) -> Dict:
        """Validate SWIS data quality and completeness."""
        validation_results = {
            'total_records': len(df),
            'time_coverage': {},
            'parameter_completeness': {},
            'data_quality_issues': [],
            'recommendations': []
        }
        
        # Time coverage validation
        if isinstance(df.index, pd.DatetimeIndex):
            validation_results['time_coverage'] = {
                'start_time': df.index.min(),
                'end_time': df.index.max(),
                'duration_days': (df.index.max() - df.index.min()).days,
                'time_gaps': self._find_time_gaps(df.index)
            }
        
        # Parameter completeness
        params = ['proton_velocity', 'proton_density', 'proton_temperature', 'proton_flux']
        for param in params:
            if param in df.columns:
                completeness = df[param].notna().sum() / len(df)
                validation_results['parameter_completeness'][param] = completeness
                
                if completeness < 0.7:
                    validation_results['data_quality_issues'].append(
                        f"Low completeness for {param}: {completeness:.1%}"
                    )
        
        # Generate recommendations
        validation_results['recommendations'] = self._generate_recommendations(
            validation_results
        )
        
        return validation_results
    
    def _find_time_gaps(self, time_index: pd.DatetimeIndex, 
                       max_gap_minutes: int = 10) -> List[Dict]:
        """Find significant time gaps in the data."""
        time_diffs = time_index.to_series().diff()
        gap_threshold = pd.Timedelta(minutes=max_gap_minutes)
        
        gaps = []
        gap_indices = time_diffs > gap_threshold
        
        for idx in time_diffs[gap_indices].index:
            gaps.append({
                'start_time': time_index[idx-1],
                'end_time': time_index[idx],
                'duration': time_diffs[idx]
            })
        
        return gaps
    
    def _generate_recommendations(self, validation_results: Dict) -> List[str]:
        """Generate data quality recommendations."""
        recommendations = []
        
        # Check completeness
        for param, completeness in validation_results['parameter_completeness'].items():
            if completeness < 0.5:
                recommendations.append(
                    f"Consider alternative data sources for {param} due to low completeness"
                )
            elif completeness < 0.8:
                recommendations.append(
                    f"Apply gap-filling techniques for {param}"
                )
        
        # Check time gaps
        if validation_results['time_coverage'].get('time_gaps'):
            gap_count = len(validation_results['time_coverage']['time_gaps'])
            recommendations.append(
                f"Address {gap_count} significant time gaps in the data"
            )
        
        return recommendations

def validate_cme_catalog(cme_df: pd.DataFrame) -> Dict:
    """Validate CME catalog data."""
    validation = {
        'total_events': len(cme_df),
        'date_range': {},
        'parameter_ranges': {},
        'data_quality': 'PASS'
    }
    
    if not cme_df.empty:
        validation['date_range'] = {
            'start': cme_df['datetime'].min(),
            'end': cme_df['datetime'].max()
        }
        
        # Check parameter ranges
        if 'velocity' in cme_df.columns:
            validation['parameter_ranges']['velocity'] = {
                'min': cme_df['velocity'].min(),
                'max': cme_df['velocity'].max(),
                'mean': cme_df['velocity'].mean()
            }
    
    return validation
